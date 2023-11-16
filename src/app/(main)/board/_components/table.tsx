"use client";

import type { RangeSelection, TextFormatType } from "lexical";

import * as React from "react";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  $generateJSONFromSelectedNodes,
  $generateNodesFromSerializedNodes,
  $insertGeneratedNodes,
} from "@lexical/clipboard";

import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import {
  $addUpdateTag,
  $createParagraphNode,
  $createRangeSelection,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  createEditor,
  EditorThemeClasses,
  LexicalEditor,
  NodeKey,
  CLICK_COMMAND,
  COPY_COMMAND,
  CUT_COMMAND,
  PASTE_COMMAND,
  FORMAT_TEXT_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  KEY_TAB_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical";

import { createPortal } from "react-dom";
import { IS_APPLE } from "@/utils/environment";

import { CellContext } from "./plugins/table-plugin";
import {
  $isTableNode,
  Cell,
  cellHTMLCache,
  cellTextContentCache,
  createRow,
  createUID,
  exportTableCellsToHTML,
  extractRowsFromHTML,
  Rows,
  TableNode,
} from "./nodes/table-node";

type SortOptions = { type: "ascending" | "descending"; x: number };

const NO_CELLS: [] = [];

function $createSelectAll(): RangeSelection {
  const selection = $createRangeSelection();
  selection.focus.set("root", $getRoot().getChildrenSize(), "element");
  return selection;
}

function createEmptyParagraphHTML(theme: EditorThemeClasses): string {
  return `<p class="${theme.paragraph}"><br></p>`;
}

export default function TableComponent() {
  return (
    <>
      <div>TODO</div>
    </>
  );
}
