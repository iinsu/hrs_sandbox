"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ImagePlus,
  Italic,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useModal from "@/hooks/useModal";
import { InsertImageUriDialogBody } from "../plugins/image-plugin";

export const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [modal, showModal] = useModal();

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [updateToolbar, editor]);

  return (
    <>
      <div className="p-2 rounded-sm fixed space-x-2 bg-slate-800 mt-3 h-10 flex items-center">
        <button
          className={cn(
            "p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in",
            isBold ? "bg-gray-700" : "bg-transparent"
          )}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        >
          <Bold className="h-5 w-5 text-white" />
        </button>
        <button
          className={cn(
            "p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in",
            isStrikethrough ? "bg-gray-700" : "bg-transparent"
          )}
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
          }
        >
          <Strikethrough className="h-5 w-5 text-white" />
        </button>
        <button
          className={cn(
            "p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in",
            isItalic ? "bg-gray-700" : "bg-transparent"
          )}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        >
          <Italic className="h-5 w-5 text-white" />
        </button>
        <button
          className={cn(
            "p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in",
            isUnderline ? "bg-gray-700" : "bg-transparent"
          )}
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          }
        >
          <Underline className="h-5 w-5 text-white" />
        </button>
        <span className="w-[1px] bg-gray-600 block h-full" />
        <button
          className="p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        >
          <AlignLeft className="h-5 w-5 text-white" />
        </button>
        <button
          className="p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in"
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
          }
        >
          <AlignCenter className="h-5 w-5 text-white" />
        </button>
        <button
          className="p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in"
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
          }
        >
          <AlignRight className="h-5 w-5 text-white" />
        </button>
        <button
          className="p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in"
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
          }
        >
          <AlignJustify className="h-5 w-5 text-white" />
        </button>
        <span className="w-[1px] bg-gray-600 block h-full" />
        <button
          className="p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in"
          onClick={() => {
            showModal("Insert Image", (onClose) => (
              <InsertImageUriDialogBody
                activeEditor={activeEditor}
                onClose={onClose}
              />
            ));
          }}
        >
          <ImagePlus className="h-5 w-5 text-white" />
        </button>
        <span className="w-[1px] bg-gray-600 block h-full" />
        <button
          className="p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in"
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        >
          <Undo2 className="h-5 w-5 text-white" />
        </button>
        <button
          className="p-1 rounded-sm hover:bg-gray-700 transition-colors duration-100 ease-in"
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        >
          <Redo2 className="h-5 w-5 text-white" />
        </button>
      </div>
    </>
  );
};
