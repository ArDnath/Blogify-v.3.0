import { useState,useCallback } from 'react';
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
} from 'reactjs-tiptap-editor/extension-bundle';

import 'reactjs-tiptap-editor/style.css';
import Logout from '../components/Logout';
import { useTheme } from "../components/ThemeContext";


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
  const {theme} = useTheme();
  const [content, setContent] = useState<string>(DEFAULT_CONTENT);
  const [disable, setDisable] = useState(false)


  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value)
    }, 300),
    [],
  )


  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 py-10 ">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
  
        {/* Logout button aligned to top-right */}
        <div className="flex justify-end">
          <Logout />
        </div>
  
        {/* RichTextEditor */}
        
          <RichTextEditor
            output="json"
            content={content as any}
            onChangeContent={onValueChange}
            extensions={extensions}
            dark={theme === "night"}
            disabled={disable}
          />
  
        {/* HTML Output textarea */}
        {(
          <textarea
            readOnly
            value={JSON.stringify(content,null,2)}
            className="w-full h-[500px] p-4 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-mono"
          />
        )}
      </div>
    </div>
  );
  
};

export default CreatePage;
