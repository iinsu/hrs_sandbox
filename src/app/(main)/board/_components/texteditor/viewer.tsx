"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Dispatch, SetStateAction } from "react";
import PlaygroundNodes from "../nodes/playground-nodes";
import ImagesPlugin from "../plugins/image-plugin";

interface ViewerProps {
  text: string | undefined;
  setReadOnly?: Dispatch<SetStateAction<boolean>>;
}

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

const emptyText =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export const LexicalViewer = ({ text, setReadOnly }: ViewerProps) => {
  const initialConfig: InitialConfigType = {
    namespace: "TextEditor",
    theme,
    onError,
    editorState: text ?? emptyText,
    editable: false,
    nodes: [...PlaygroundNodes],
  };

  return (
    <>
      <div className="bg-white relative rounded-sm shadow-sm border border-gray-200 h-full">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="h-[450px] outline-none py-[15px] px-2 resize-none text-ellipsis overflow-auto" />
            }
            placeholder={
              <div className="absolute top-[15px] left-[10px] pointer-events-none select-none">
                Enter some text...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ImagesPlugin />
        </LexicalComposer>
      </div>
      <button
        className="py-1 px-2 bg-slate-200 mt-2 rounded-sm hover:bg-slate-500 hover:text-white"
        onClick={() => setReadOnly && setReadOnly(false)}
      >
        Edit
      </button>
    </>
  );
};
