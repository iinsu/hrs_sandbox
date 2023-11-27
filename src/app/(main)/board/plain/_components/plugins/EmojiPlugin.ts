import { useEffect } from "react";
import { LexicalEditor, TextNode } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { $createEmojiNode } from "../nodes/EmojiNode";

function emojiTransform(node: TextNode) {
  const textContent = node.getTextContent();
  if (textContent === ":)") {
    node.replace($createEmojiNode("emoji happysmile", "😄"));
  }
}

function useEmoji(editor: LexicalEditor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      emojiTransform
    );
    return () => {
      removeTransform();
    };
  }, [editor]);
}

const EmojiPlugin = () => {
  const [editor] = useLexicalComposerContext();
  useEmoji(editor);
  return null;
};

export default EmojiPlugin;
