import React, { useState,useCallback } from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';
import {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  ColumnActionButton,
  ExportWord,
  FontSize,
  Heading,
  History,
  HorizontalRule,
  Image,
  ImageGif,
  ImportWord,
  Indent,
  Italic,
  LineHeight,
  Link,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
  TextAlign,
  Underline,
  Video,
} from 'reactjs-tiptap-editor/extension-bundle'

import 'reactjs-tiptap-editor/style.css';
import Logout from '../components/Logout';


const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  SearchAndReplace,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  LineHeight,
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  Video.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  ImageGif.configure({
    GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY as string,
  }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock.configure({ defaultTheme: 'dracula' }),
  ColumnActionButton,
  Table,
  ImportWord.configure({
    upload: (files: File[]) => {
      const f = files.map(file => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }))
      return Promise.resolve(f)
    },
  }),
  ExportWord,
]



const DEFAULT_CONTENT = '';


function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}


const CreatePage = () => {
  const [content, setContent] = useState<string>(DEFAULT_CONTENT);
  const [theme, setTheme] = useState('light')
  const [disable, setDisable] = useState(false)


  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value)
    }, 300),
    [],
  )


  const onChangeContent = (value: string) => {
    setContent(value);
    console.log("Editor content:", value); // Optional: see what user is typing
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }), // send HTML content to backend
      });

      const result = await res.json();
      if (res.ok) {
        alert('Blog post created successfully!');
      } else {
        alert(result.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error submitting post');
    }
  };

  return (
    <div>
  <div
    className="p-[24px] flex flex-col w-full max-w-screen-lg gap-[24px] mx-auto my-0 rounded-[16px] overflow-hidden min-h-screen"
    style={{
      margin: '40px auto',
    }}
  >
     

      <RichTextEditor
        output="html"
        content={content as any}
        onChangeContent={onValueChange}
        extensions={extensions}
        dark={theme === 'dark'}
        disabled={disable}
      />

      {typeof content === 'string' && (
        <textarea
          style={{
            marginTop: 20,
            height: 500,
          }}
          readOnly
          value={content}
        />
      )}
    </div>
    <div>
        <Logout />
      </div>
    </div>
  );
};

export default CreatePage;
