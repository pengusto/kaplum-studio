"use client";
import { useEffect, useRef } from "react";
import { createEditor } from "../src/editor";
export default function EditorPane({
  source,
  theme,
  onChange,
  editorRef,
  label,
}) {
  const host = useRef(null);
  const change = useRef(onChange);
  change.current = onChange;
  useEffect(() => {
    const editor = createEditor(host.current);
    editorRef.current = editor;
    editor.value = source;
    editor.onChange(() => change.current(editor.value));
    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);
  useEffect(() => {
    editorRef.current?.configure(theme, label);
  }, [theme, label, editorRef]);
  return <div ref={host} className="editor-host" />;
}
