import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

const TiptapEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      Placeholder.configure({
        placeholder: "Start typing your content...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  return (
    <div className="border rounded p-2" style={{ minHeight: "250px" }}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
