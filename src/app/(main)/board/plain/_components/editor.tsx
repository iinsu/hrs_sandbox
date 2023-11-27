"use client";

import { $getRoot, $getSelection } from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import EditorConfig from "./config";

const Placeholder = () => {
  return <div className="editor-placeholder">Enter some plain text...</div>;
};

const Editor = () => {
  return (
    <>
      <LexicalComposer initialConfig={EditorConfig}>
        <div className="editor-container border rounded-md">
          <PlainTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
            placeholder={<Placeholder />}
          />
        </div>
      </LexicalComposer>
    </>
  );
};

export default Editor;
