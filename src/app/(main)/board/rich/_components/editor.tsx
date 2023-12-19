"use client";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import { RichEditorConfig } from "../config";
import { useSettings } from "./context/SettingContext";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlogin";

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
            <AutoFocusPlugin />
            <HistoryPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
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
