"use client";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

import { RichEditorConfig } from "../config";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useSettings } from "./context/SettingContext";

const Placeholder = () => {
  return <div className="editor-placeholder">Enter some rich text...</div>;
};

const Editor = () => {
  const {
    settings: {
      isCollab,
      isAutocomplete,
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      isRichText,
      showTreeView,
      showTableOfContents,
      shouldUseLexicalContextMenu,
      tableCellMerge,
      tableCellBackgroundColor,
    },
  } = useSettings();

  return (
    <>
      <LexicalComposer initialConfig={RichEditorConfig}>
        <div className="editor-container border rounded-md">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <AutoFocusPlugin />
            <TablePlugin
              hasCellMerge={tableCellMerge}
              hasCellBackgroundColor={tableCellBackgroundColor}
            />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
};

export default Editor;
