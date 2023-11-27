"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import EditorConfig from "./config";
import { AutoFocusPlugin } from "./plugins/AutoFocusPlugin";
import EmojiPlugin from "./plugins/EmojiPlugin";

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
        <AutoFocusPlugin />
        <EmojiPlugin />
      </LexicalComposer>
    </>
  );
};

export default Editor;
