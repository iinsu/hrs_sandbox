"use client";

import type { RangeSelection, TextFormatType } from "lexical";

import * as React from "react";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  $generateJSONFromSelectedNodes,
  $generateNodesFromSerializedNodes,
  $insertGeneratedNodes,
} from "@lexical/clipboard";

import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import {
  $addUpdateTag,
  $createParagraphNode,
  $createRangeSelection,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  createEditor,
  EditorThemeClasses,
  LexicalEditor,
  NodeKey,
  CLICK_COMMAND,
  COPY_COMMAND,
  CUT_COMMAND,
  PASTE_COMMAND,
  FORMAT_TEXT_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  KEY_TAB_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical";

import { createPortal } from "react-dom";
import { IS_APPLE } from "@/utils/environment";

import { CellContext } from "./plugins/table-plugin";
import {
  $isTableNode,
  Cell,
  cellHTMLCache,
  cellTextContentCache,
  createRow,
  createUID,
  exportTableCellsToHTML,
  extractRowsFromHTML,
  Rows,
  TableNode,
} from "./nodes/table-node";

type SortOptions = { type: "ascending" | "descending"; x: number };

const NO_CELLS: [] = [];

function $createSelectAll(): RangeSelection {
  const selection = $createRangeSelection();
  selection.focus.set("root", $getRoot().getChildrenSize(), "element");
  return selection;
}

function createEmptyParagraphHTML(theme: EditorThemeClasses): string {
  return `<p class="${theme.paragraph}"><br></p>`;
}

function focusCell(tableElem: HTMLElement, id: string): void {
  const cellElem = tableElem.querySelector(`[data-id=${id}]`) as HTMLElement;
  if (cellElem == null) {
    return;
  }
  cellElem.focus();
}

function getSelectedRect(
  startID: string,
  endID: string,
  cellCoordMap: Map<string, [number, number]>
): null | { startX: number; endX: number; startY: number; endY: number } {
  const startCoords = cellCoordMap.get(startID);
  const endCoords = cellCoordMap.get(endID);

  if (startCoords === undefined || endCoords === undefined) {
    return null;
  }

  const startX = Math.min(startCoords[0], endCoords[0]);
  const endX = Math.max(startCoords[0], endCoords[0]);
  const startY = Math.min(startCoords[1], endCoords[1]);
  const endY = Math.max(startCoords[1], endCoords[1]);

  return {
    endX,
    endY,
    startX,
    startY,
  };
}
function getSelectedIDs(
  rows: Rows,
  startID: string,
  endID: string,
  cellCoordMap: Map<string, [number, number]>
): Array<string> {
  const rect = getSelectedRect(startID, endID, cellCoordMap);
  if (rect === null) {
    return [];
  }

  const { startX, endY, endX, startY } = rect;
  const ids = [];

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      ids.push(rows[y].cells[x].id);
    }
  }
  return ids;
}

function extractCellsFromRows(
  rows: Rows,
  rect: {
    startX: number;
    endX: number;
    startY: number;
    endY: number;
  }
): Rows {
  const { startX, endY, endX, startY } = rect;
  const newRows: Rows = [];

  for (let y = startY; y <= endY; y++) {
    const row = rows[y];
    const newRow = createRow();
    for (let x = startX; x <= endX; x++) {
      const cellClone = { ...row.cells[x] };
      cellClone.id = createUID();
      newRow.cells.push(cellClone);
    }
    newRows.push(newRow);
  }

  return newRows;
}

export default function TableComponent({
  nodeKey,
  rows: rawRows,
  theme,
}: {
  nodeKey: NodeKey;
  rows: Rows;
  theme: EditorThemeClasses;
}) {
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const resizeMeasureRef = useRef<{ size: number; point: number }>({
    point: 0,
    size: 0,
  });
  const [sortingOptions, setSortingOptions] = useState<null | SortOptions>(
    null
  );

  const addRowsRef = useRef(null);
  const lastCellIDRef = useRef<string | null>(null);
  const tableResizerRulerRef = useRef<null | HTMLDivElement>(null);
  const { cellEditorConfig } = useContext(CellContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddColumns, setShowAddColumns] = useState(false);
  const [showAddRows, setShowAddRows] = useState(false);

  const [editor] = useLexicalComposerContext();

  const mouseDownRef = useRef(false);
  const [resizingID, setResizingID] = useState<null | string>(null);
  const tableRef = useRef<null | HTMLTableElement>(null);

  const cellCoordMap = useMemo(() => {
    const map = new Map();

    for (let y = 0; y < rawRows.length; y++) {
      const row = rawRows[y];
      const cells = row.cells;
      for (let x = 0; x < cells.length; x++) {
        const cell = cells[x];
        map.set(cell.id, [x, y]);
      }
    }
    return map;
  }, [rawRows]);

  const rows = useMemo(() => {
    if (sortingOptions === null) {
      return rawRows;
    }
    const _rows = rawRows.slice(1);
    _rows.sort((a, b) => {
      const aCells = a.cells;
      const bCells = b.cells;
      const x = sortingOptions.x;
      const aContent = cellTextContentCache.get(aCells[x].json) || "";
      const bContent = cellTextContentCache.get(bCells[x].json) || "";
      if (aContent === "" || bContent === "") {
        return 1;
      }
      if (sortingOptions.type === "ascending") {
        return aContent.localeCompare(bContent);
      }
      return bContent.localeCompare(aContent);
    });
    _rows.unshift(rawRows[0]);
    return _rows;
  }, [rawRows, sortingOptions]);

  const [primarySelectedCellID, setPrimarySelectedCellID] = useState<
    null | string
  >(null);

  const cellEditor = useMemo<null | LexicalEditor>(() => {
    if (cellEditorConfig === null) {
      return null;
    }
    const _cellEditor = createEditor({
      namespace: cellEditorConfig.namespace,
      nodes: cellEditorConfig.nodes,
      onError: (error: Error) => cellEditorConfig.onError(error, _cellEditor),
      theme: cellEditorConfig.theme,
    });
    return _cellEditor;
  }, [cellEditorConfig]);

  const [selectedCellIDs, SetSelectedCellIDs] = useState<Array<string>>([]);

  const selectedCellSet = useMemo<Set<string>>(
    () => new Set(selectedCellIDs),
    [selectedCellIDs]
  );

  useEffect(() => {
    const tableElem = tableRef.current;
    if (
      isSelected &&
      document.activeElement === document.body &&
      tableElem !== null
    ) {
      tableElem.focus();
    }
  }, [isSelected]);

  const updateTableNode = useCallback(
    (fn: (tableNode: TableNode) => void) => {
      editor.update(() => {
        const tableNode = $getNodeByKey(nodeKey);
        if ($isTableNode(tableNode)) {
          fn(tableNode);
        }
      });
    },
    [editor, nodeKey]
  );

  const addColumns = () => {
    updateTableNode((tableNode) => {
      $addUpdateTag("history-push");
      tableNode.addColumns(1);
    });
  };

  const addRows = () => {
    updateTableNode((tableNode) => {
      $addUpdateTag("history-push");
      tableNode.addColumns(1);
    });
  };

  const modifySelectedCells = useCallback(
    (x: number, y: number, extend: boolean) => {
      const id = rows[y].cells[x].id;
      lastCellIDRef.current = id;
      if (extend) {
        const selectedIDs = getSelectedIDs(
          rows,
          primarySelectedCellID as string,
          id,
          cellCoordMap
        );
        SetSelectedCellIDs(selectedIDs);
      } else {
        setPrimarySelectedCellID(id);
        SetSelectedCellIDs(NO_CELLS);
        focusCell(tableRef.current as HTMLElement, id);
      }
    },
    [cellCoordMap, primarySelectedCellID, rows]
  );

  const saveEditorToJSON = useCallback(() => {
    if (cellEditor !== null && primarySelectedCellID !== null) {
      const json = JSON.stringify(cellEditor.getEditorState());
      updateTableNode((tableNode) => {
        const coords = cellCoordMap.get(primarySelectedCellID);
        if (coords === undefined) {
          return;
        }
        $addUpdateTag("history-push");
        const [x, y] = coords;
        tableNode.updateCellJSON(x, y, json);
      });
    }
  }, [cellCoordMap, cellEditor, primarySelectedCellID, updateTableNode]);

  const selectTable = useCallback(() => {
    setTimeout(() => {
      const parentRootElement = editor.getRootElement();
      if (parentRootElement !== null) {
        parentRootElement.focus({ preventScroll: true });
        window.getSelection()?.removeAllRanges();
      }
    }, 20);
  }, [editor]);

  useEffect(() => {
    const tableElem = tableRef.current;
  }, []);

  return (
    <>
      <div>TODO</div>
    </>
  );
}
