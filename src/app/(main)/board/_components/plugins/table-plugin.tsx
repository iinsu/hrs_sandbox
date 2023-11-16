"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  $insertNodes,
  createCommand,
  EditorThemeClasses,
  Klass,
  LexicalCommand,
  LexicalEditor,
  LexicalNode,
  COMMAND_PRIORITY_EDITOR,
} from "lexical";
import { INSERT_TABLE_COMMAND } from "@lexical/table";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { Button } from "@/components/ui/button";
import { DialogActions } from "@/components/ui/lexcial/dialog";
import TextInput from "@/components/ui/lexcial/text-input";
import invariant from "@/utils/invariant";
import { $createTableNodeWithDimensions, TableNode } from "../nodes/table-node";

export type InsertTableCommandPayload = Readonly<{
  columns: string;
  rows: string;
  includeHeaders?: boolean;
}>;

export type CellEditorConfig = Readonly<{
  namespace: string;
  nodes?: ReadonlyArray<Klass<LexicalNode>>;
  onError: (error: Error, editor: LexicalEditor) => void;
  readOnly?: boolean;
  theme?: EditorThemeClasses;
}>;

export type CellContextShape = {
  cellEditorConfig: null | CellEditorConfig;
  cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
  set: (
    cellEditorConfig: null | CellEditorConfig,
    cellEditorPlugin: null | JSX.Element | Array<JSX.Element>
  ) => void;
};

export const INSERT_NEW_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> =
  createCommand("INSERT_NEW_TABLE_COMMAND");

export const CellContext = createContext<CellContextShape>({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {}, //Empty
});

interface TableContextProps {
  cellEditorConfig: null | CellEditorConfig;
  cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
}

export function TableContext({ children }: { children: JSX.Element }) {
  const [contextValue, setContextValue] = useState<TableContextProps>({
    cellEditorConfig: null,
    cellEditorPlugins: null,
  });

  const providerValue = useMemo(
    (): CellContextShape => ({
      cellEditorConfig: contextValue.cellEditorConfig,
      cellEditorPlugins: contextValue.cellEditorPlugins,
      set: (cellEditorConfig, cellEditorPlugins) => {
        setContextValue({ cellEditorConfig, cellEditorPlugins });
      },
    }),
    [contextValue.cellEditorConfig, contextValue.cellEditorPlugins]
  );

  return (
    <CellContext.Provider value={providerValue}>
      {children}
    </CellContext.Provider>
  );
}

interface DialogProps {
  activeEditor: LexicalEditor;
  onClose: () => void;
}

export function InsertTableDialog({
  activeEditor,
  onClose,
}: DialogProps): JSX.Element {
  const [rows, setRows] = useState("2");
  const [columns, setColumns] = useState("2");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const row = Number(rows);
    const column = Number(columns);
    if (row && row > 0 && row <= 500 && column && column > 0 && column <= 50) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rows, columns]);

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows });
    onClose();
  };

  return (
    <>
      <TextInput
        label="Rows"
        type="number"
        data-test-id="table-modal-rows"
        placeholder={"# of rows (1-50)"}
        onChange={setRows}
        value={rows}
      />
      <TextInput
        label="Columns"
        type="number"
        data-test-id="table-modal-columns"
        placeholder={"# of columns (1-50)"}
        onChange={setColumns}
        value={columns}
      />
      <DialogActions data-test-id="table-model-confirm-insert">
        <Button disabled={isDisabled} onClick={onClick}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

interface TablePluginProps {
  cellEditorConfig: CellEditorConfig;
  children: JSX.Element | Array<JSX.Element>;
}

export function TablePlugin({
  cellEditorConfig,
  children,
}: TablePluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const cellContext = useContext(CellContext);

  useEffect(() => {
    if (!editor.hasNodes([TableNode])) {
      invariant(false, "TablePlugin: TableNode is not registered on editor");
    }
    cellContext.set(cellEditorConfig, children);

    return editor.registerCommand<InsertTableCommandPayload>(
      INSERT_NEW_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const tableNode = $createTableNodeWithDimensions(
          Number(rows),
          Number(columns),
          includeHeaders
        );
        $insertNodes([tableNode]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [cellContext, cellEditorConfig, children, editor]);

  return null;
}
