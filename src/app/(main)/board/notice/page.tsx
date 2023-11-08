"use client";

import { LexicalEditor } from "../_components/texteditor/editor";

const NoticePage = () => {
  return (
    <>
      <div>
        <h1 className="text-slate-800 font-bold text-center mt-2">Lexical</h1>
      </div>
      <div className="max-w-[800px] mt-6 mx-auto">
        <LexicalEditor />
      </div>
    </>
  );
};

export default NoticePage;
