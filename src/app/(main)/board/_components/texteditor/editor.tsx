"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Toolbar } from "./toolbar";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

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

export const LexicalEditor = () => {
  const initialConfig = {
    namespace: "TextEditor",
    theme,
    onError,
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
          <HistoryPlugin />
        </LexicalComposer>
      </div>
    </>
  );
};
