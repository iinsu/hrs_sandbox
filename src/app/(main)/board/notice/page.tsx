"use client";

import { useState } from "react";
import { LexicalEditor } from "../_components/texteditor/editor";
import { LexicalViewer } from "../_components/texteditor/viewer";

const NoticePage = () => {
  const [text, setText] = useState<string>();
  const [readOnly, setReadOnly] = useState(false);
  return (
    <>
      <div>
        <h1 className="text-slate-800 font-bold text-center mt-2">Lexical</h1>
      </div>
      <div className="max-w-[800px] mt-6 mx-auto">
        {readOnly ? (
          <LexicalViewer text={text} setReadOnly={setReadOnly} />
        ) : (
          <LexicalEditor
            text={text}
            setText={setText}
            setReadOnly={setReadOnly}
          />
        )}
      </div>
    </>
  );
};

export default NoticePage;
