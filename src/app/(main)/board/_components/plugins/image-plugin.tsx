import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";

import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
  LexicalEditor,
} from "lexical";

import { $createImageNode, ImageNode, ImagePayload } from "../nodes/image-node";
import {
  DialogActions,
  DialogButtonsList,
} from "@/components/ui/lexcial/dialog";
import Button from "@/components/ui/lexcial/button";
import TextInput from "@/components/ui/lexcial/text-input";

export type InsertImagePlayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePlayload> =
  createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageUriDialogBody({
  onClick,
}: {
  onClick: (payload: InsertImagePlayload) => void;
}) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisalbed = src === "";

  return (
    <>
      <TextInput
        label="Image URL"
        placeholder="i.e. https://source.unsplash.com/random"
        onChange={setSrc}
        value={src}
        data-test-id="image-modal-url-input"
      />
      <TextInput
        label="Alt Text"
        placeholder="Random unsplash image"
        onChange={setAltText}
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      <DialogActions>
        <Button
          disabled={isDisalbed}
          onClick={() => onClick({ altText, src })}
          data-test-id="image-modal-confirm-btn"
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

export function InsertImageDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
}): JSX.Element {
  const [mode, setMode] = useState<null | "url" | "file">(null);
  const hasModifier = useRef(false);

  useEffect(() => {
    hasModifier.current = false;
    const handler = (event: KeyboardEvent) => {
      hasModifier.current = event.altKey;
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [activeEditor]);

  const onClick = (payload: InsertImagePlayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };

  return (
    <>
      {!mode && (
        <DialogButtonsList>
          <Button
            data-test-id="image-modal-option-sample"
            className="mb-2"
            onClick={() =>
              onClick(
                hasModifier.current
                  ? {
                      altText:
                        "Daylight fir trees forest glacier green high ice landscape",
                      src: "/images/landscape.jag",
                    }
                  : {
                      altText: "Yellow flower in tilt shift lens",
                      src: "/images/yellow-flower.jpg",
                    }
              )
            }
          >
            Sample
          </Button>
          <Button
            data-test-id="image-modal-option-url"
            className="mb-2"
            onClick={() => setMode("url")}
          >
            URL
          </Button>
          <Button
            data-test-id="image-modal-option-file"
            onClick={() => setMode("file")}
          >
            File
          </Button>
        </DialogButtonsList>
      )}
      {mode === "url" && <InsertImageUriDialogBody onClick={onClick} />}
    </>
  );
}

export default function ImagesPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagePlugin: ImageNode not registerd on editor");
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePlayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor]);

  return null;
}
