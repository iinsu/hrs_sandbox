"use client";

import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

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

export const LexicalViewer = ({ text }: { text: string | undefined }) => {
  /* if (typeof text !== "string") {
    return;
  } */

  const initialConfig: InitialConfigType = {
    namespace: "TextEditor",
    theme,
    onError,
    editorState: text ?? emptyText,
    editable: false,
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
        </LexicalComposer>
      </div>
    </>
  );
};
