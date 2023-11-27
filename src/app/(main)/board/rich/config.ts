import { EditorTheme } from "./themes/editor-theme";

export const RichEditorConfig = {
  namespace: "RichEditor",
  // The editor theme
  theme: EditorTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  //Any custom nodes go here
  nodes: [],
};
