import { EditorConfig, LexicalNode, NodeKey, TextNode } from "lexical";

export class EmojiNode extends TextNode {
  __className: string;

  static getType(): string {
    return "emoji";
  }

  static clone(node: EmojiNode): EmojiNode {
    return new EmojiNode(node.__className, node.__text, node.__key);
  }

  constructor(className: string, text: string, key?: NodeKey) {
    super(text, key);
    this.__className = className;
  }

  createDOM(config: EditorConfig) {
    const dom = document.createElement("span");
    const inner = super.createDOM(config);
    dom.className = this.__className;
    inner.className = "emoji-inner";
    dom.appendChild(inner);
    return dom;
  }

  updateDOM(preNode: TextNode, dom: HTMLElement, config: EditorConfig) {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(preNode, inner as HTMLElement, config);
    return false;
  }
}

export function $isEmojiNode(node: LexicalNode | null | undefined) {
  return node instanceof EmojiNode;
}

export function $createEmojiNode(className: string, emojiText: string) {
  return new EmojiNode(className, emojiText).setMode("token");
}
