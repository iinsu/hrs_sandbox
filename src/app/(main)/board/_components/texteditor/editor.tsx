"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Toolbar } from "./toolbar";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useRef } from "react";

const theme = {
  paragraph: "mb-1",
  rtl: "text-right",
  ltr: "text-left",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
};

function onError(error: Error) {
  console.error(error);
}

const loadContent = async () => {
  // 'empty' editor
  const value =
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
  return value;
};

export const LexicalEditor = () => {
  const initialEditorState = loadContent();
  const editorStateRef = useRef<EditorState>();

  const initialConfig = {
    namespace: "TextEditor",
    theme,
    onError,
    initialEditorState,
  };

  return (
    <>
      <div className="bg-white relative rounded-sm shadow-sm border border-gray-200">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[450px] outline-none py-[15px] px-2 resize-none overflow-hidden text-ellipsis" />
            }
            placeholder={
              <div className="absolute top-[15px] left-[10px] pointer-events-none select-none">
                Enter some text...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <Toolbar />
          <div className="absolute right-0 bottom-[-50px] bg-slate-200 p-1 rounded-sm">
            <button
              type="submit"
              onClick={() => {
                if (editorStateRef.current) {
                  console.log(JSON.stringify(editorStateRef.current));
                }
              }}
            >
              Submit
            </button>
          </div>
          <HistoryPlugin />
          <OnChangePlugin
            onChange={(editorState) => (editorStateRef.current = editorState)}
          />
        </LexicalComposer>
      </div>
    </>
  );
};
