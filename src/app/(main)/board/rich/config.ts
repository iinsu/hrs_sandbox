import { EditorTheme } from "./themes/editor-theme";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

export const RichEditorConfig = {
  namespace: "RichEditor",
  // The editor theme
  theme: EditorTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  //Any custom nodes go here
  nodes: [
    TableCellNode,
    TableNode,
    TableRowNode,
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
  ],
};
