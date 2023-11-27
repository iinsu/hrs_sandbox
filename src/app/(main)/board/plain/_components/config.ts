import EditorTheme from "./themes/editor-theme";

const onError = (error: Error) => {
  throw error;
};

const EditorConfig = {
  namespace: "MyEditor",
  theme: EditorTheme,
  onError,
};

export default EditorConfig;
