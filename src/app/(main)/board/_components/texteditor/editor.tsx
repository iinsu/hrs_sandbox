"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Toolbar } from "./toolbar";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { EditorState, EditorThemeClasses } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { Dispatch, SetStateAction, useRef } from "react";
import ImagesPlugin from "../plugins/image-plugin";
import DragDropPaste from "../plugins/drop-paste-plugin";
import PlaygroundNodes from "../nodes/playground-nodes";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

interface TextProps {
  text?: string | undefined;
  setText: Dispatch<SetStateAction<string | undefined>>;
  setReadOnly?: Dispatch<SetStateAction<boolean>>;
}

const theme: EditorThemeClasses = {
  paragraph: "mb-1",
  rtl: "text-right",
  ltr: "text-left",
  image: "editor-image",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
  table: "PlaygroundEditorTheme__table",
  tableAddColumns: "PlaygroundEditorTheme__tableAddColumns",
  tableAddRows: "PlaygroundEditorTheme__tableAddRows",
  tableCell: "PlaygroundEditorTheme__tableCell",
  tableCellActionButton: "PlaygroundEditorTheme__tableCellActionButton",
  tableCellActionButtonContainer:
    "PlaygroundEditorTheme__tableCellActionButtonContainer",
  tableCellEditing: "PlaygroundEditorTheme__tableCellEditing",
  tableCellHeader: "PlaygroundEditorTheme__tableCellHeader",
  tableCellPrimarySelected: "PlaygroundEditorTheme__tableCellPrimarySelected",
  tableCellResizer: "PlaygroundEditorTheme__tableCellResizer",
  tableCellSelected: "PlaygroundEditorTheme__tableCellSelected",
  tableCellSortedIndicator: "PlaygroundEditorTheme__tableCellSortedIndicator",
  tableResizeRuler: "PlaygroundEditorTheme__tableCellResizeRuler",
  tableSelected: "PlaygroundEditorTheme__tableSelected",
  tableSelection: "PlaygroundEditorTheme__tableSelection",
};

function onError(error: Error) {
  console.error(error);
}

const emptyText =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export const LexicalEditor = ({ text, setText, setReadOnly }: TextProps) => {
  const editorStateRef = useRef<EditorState>();

  const initialConfig = {
    namespace: "TextEditor",
    theme,
    onError,
    editable: true,
    editorState: text ?? emptyText,
    nodes: [...PlaygroundNodes],
  };

  const handleChange = (editorState: EditorState) => {
    editorStateRef.current = editorState;
    console.log(editorState);
  };

  return (
    <>
      <div className="bg-white relative rounded-sm shadow-sm border border-gray-200 h-full">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <div className="ContentEditable__root">
                <ContentEditable className="outline-none py-[15px] px-2 resize-none overflow-auto text-ellipsis h-[450px]" />
              </div>
            }
            placeholder={
              <div className="absolute top-[15px] left-[10px] pointer-events-none select-none">
                Enter some text...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <Toolbar />
          <HistoryPlugin />
          <ImagesPlugin />
          <DragDropPaste />
          <TablePlugin />
          <OnChangePlugin onChange={handleChange} />
        </LexicalComposer>
      </div>
      <div className="flex justify-end w-full  ">
        <button
          type="submit"
          onClick={() => {
            if (editorStateRef.current) {
              setText(JSON.stringify(editorStateRef.current));
              setReadOnly && setReadOnly(true);
            }
          }}
          className="w-[100px] h-full cursor-pointer hover:bg-slate-500 hover:text-white bg-slate-200 py-1 px-2 rounded-sm mt-2 "
        >
          Submit
        </button>
      </div>
    </>
  );
};
