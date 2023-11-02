"use client";

import { $getRoot, $getSelection, EditorState } from "lexical";
import { useEffect, useMemo, useState } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

const theme = {
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "editor-paragraph",
  placeholder: "editor-placeholder",
};

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

const BoardMainPage = () => {
  const [editorState, setEditorState] = useState();

  const initaialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  const onChange = (editorState: EditorState) => {
    /* const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON) as any); */
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      console.log(root, selection);
    });
  };

  const CustomContent = useMemo(() => {
    return (
      <ContentEditable className="ring-1 ring-black p-2 w-full rounded-md" />
    );
  }, []);

  const CustomPlaceholder = useMemo(() => {
    return <div className="absolute top-6 left-6">Enter some text...</div>;
  }, []);

  return (
    <div className="w-[600px] relative p-4 bg-slate-100">
      <LexicalComposer initialConfig={initaialConfig}>
        <PlainTextPlugin
          contentEditable={CustomContent}
          placeholder={CustomPlaceholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </div>
  );
};

export default BoardMainPage;
