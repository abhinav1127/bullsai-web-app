import React from "react";
import classNames from "classnames";
// => Tiptap packages
import type { Editor } from "@tiptap/react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";

// Custom
import * as Icons from "../../constants/Svgs";
import { LinkModal } from "./LinkModal";
import useTipTap from "~/routes/customHooks/useTipTapButtons";

export const EditorWithMenu: React.FC<{ content: string; setEditedContent: (content: string) => void }> = ({
  content,
  setEditedContent,
}) => {
  const tipTap = useTipTap(content, setEditedContent);
  if (!tipTap) return null;

  const {
    editor,
    modalIsOpen,
    url,
    setUrl,
    openModal,
    closeModal,
    saveLink,
    removeLink,
    toggleBold,
    toggleUnderline,
    toggleItalic,
    toggleStrike,
    toggleCode,
  } = tipTap;

  return (
    <div className="editor editor-with-menu">
      <div className="menu">
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("link"),
          })}
          onClick={openModal}
        >
          <Icons.Link />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("bold"),
          })}
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("underline"),
          })}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("intalic"),
          })}
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("strike"),
          })}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("code"),
          })}
          onClick={toggleCode}
        >
          <Icons.Code />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <Icons.BulletList />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <Icons.OrderedList />
        </button>
      </div>

      <BubbleMenu
        className="bubble-menu-light"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive("link");
        }}
      >
        <button className="button" onClick={openModal}>
          Edit
        </button>
        <button className="button" onClick={removeLink}>
          Remove
        </button>
      </BubbleMenu>

      <EditorContent editor={editor} />

      <LinkModal
        url={url}
        isOpen={modalIsOpen}
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </div>
  );
};

export const SimpleEditor: React.FC<{ content: string; setEditedContent: (content: string) => void }> = ({
  content,
  setEditedContent,
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
    ],
    content,
    onUpdate({ editor }) {
      setEditedContent(editor.getHTML());
    },
  }) as Editor;

  return (
    <div className="editor simple-editor">
      <EditorContent editor={editor} />
    </div>
  );
};
