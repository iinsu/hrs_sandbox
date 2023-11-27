"use client";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import { RichEditorConfig } from "../config";

const Placeholder = () => {
  return <div className="editor-placeholder">Enter some rich text...</div>;
};

const Editor = () => {
  return (
    <>
      <LexicalComposer initialConfig={RichEditorConfig}>
        <div className="editor-container border rounded-md">
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <AutoFocusPlugin />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
};

export default Editor;
