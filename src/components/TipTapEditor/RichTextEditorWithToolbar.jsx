// RichTextEditorWithToolbar.jsx
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import {common, createLowlight} from 'lowlight'

const lowlight = createLowlight(common)

import {
  CButton,
  CFormSelect,
  CFormInput,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import {
  cilBold, cilItalic, cilUnderline, cilText, cilImage, cilLink, cilAlignLeft, cilAlignCenter, cilAlignRight,
  cilList, cilListNumbered, cilParagraph, cilXCircle, cilCode, cilHighlighter
} from '@coreui/icons';

import './RichTextEditor.css';

const RichTextEditorWithToolbar = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false, link: false, underline: false }),
      Underline,
      Link,
      Image,
      TextStyle,
      Color,
      FontFamily,
      Highlight,
      Subscript,
      Superscript,
      CodeBlockLowlight.configure({ lowlight }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write your policy content here..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter a URL");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const insertImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="editor-container rounded border shadow-sm">
      <div className="toolbar bg-white border-bottom g-2 p-2 align-items-center flex-wrap">
        <CFormSelect
          className="w-auto"
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          defaultValue=""
        >
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
        </CFormSelect>

        <CButton color="light" onClick={() => editor.chain().focus().toggleBold().run()}><CIcon icon={cilBold} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleItalic().run()}><CIcon icon={cilItalic} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleUnderline().run()}><CIcon icon={cilUnderline} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleStrike().run()}><CIcon icon={cilXCircle} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleHighlight().run()}><CIcon icon={cilHighlighter} /></CButton>

        <CButton color="light" onClick={() => editor.chain().focus().setParagraph().run()}><CIcon icon={cilParagraph} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</CButton>

        <CButton color="light" onClick={() => editor.chain().focus().toggleBulletList().run()}><CIcon icon={cilList} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleOrderedList().run()}><CIcon icon={cilListNumbered} /></CButton>

        <CButton color="light" onClick={() => editor.chain().focus().setTextAlign('left').run()}><CIcon icon={cilAlignLeft} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().setTextAlign('center').run()}><CIcon icon={cilAlignCenter} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().setTextAlign('right').run()}><CIcon icon={cilAlignRight} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().setTextAlign('justify').run()}>Justify</CButton>

        <CButton color="light" onClick={() => editor.chain().focus().toggleBlockquote().run()}>“”</CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleCodeBlock().run()}><CIcon icon={cilCode} /></CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleSuperscript().run()}>X²</CButton>
        <CButton color="light" onClick={() => editor.chain().focus().toggleSubscript().run()}>X₂</CButton>

        <CButton color="light" onClick={setLink}><CIcon icon={cilLink} /></CButton>
        <CButton color="light" onClick={insertImage}><CIcon icon={cilImage} /></CButton>

        <CFormInput
          type="color"
          title="Text color"
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="form-control-color"
        />
      </div>

      <EditorContent editor={editor} className="editor bg-white p-3" style={{ minHeight: '300px', borderRadius: '0 0 0.375rem 0.375rem' }} />
    </div>
  );
};

export default RichTextEditorWithToolbar;
