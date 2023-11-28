"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_TABLE_COMMAND } from "@lexical/table";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isRangeSelection } from "lexical";
import { Table } from "lucide-react";
import { useCallback, useEffect } from "react";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isHeadingNode } from "@lexical/rich-text";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns: "2", rows: "2" });
  };

  return (
    <>
      <div className="toolbar">
        <button onClick={onClick} className="toolbar-item spaced">
          <Table />
        </button>
      </div>
    </>
  );
};

export default ToolbarPlugin;
