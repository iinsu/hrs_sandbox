import { EmojiNode } from "./nodes/EmojiNode";
import EditorTheme from "./themes/editor-theme";

/* 
Catch any errors that occur during Lexical updates and log them or
throw them as needed. If you don't throw them, Lexical will try to
recover gracefully without losing user data.
*/
const onError = (error: Error) => {
  throw error;
};

const EditorConfig = {
  namespace: "MyEditor",
  theme: EditorTheme,
  onError,
  nodes: [EmojiNode],
};

export default EditorConfig;
