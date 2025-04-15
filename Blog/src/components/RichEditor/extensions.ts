import {
    Attachment, BaseKit, Blockquote, Bold, BulletList, Clear, Code, CodeBlock, Color,
    ColumnActionButton, Emoji, Excalidraw, ExportPdf, ExportWord, FontFamily, FontSize,
    FormatPainter, Heading, Highlight, History, HorizontalRule, Iframe, Image, ImageGif,
    ImportWord, Indent, Italic, Katex, LineHeight, Link, Mention, Mermaid, MoreMark,
    OrderedList, SearchAndReplace, SlashCommand, Strike, Table, TableOfContents,
    TaskList, TextAlign, TextDirection, Twitter, Underline, Video, Drawer
  } from 'reactjs-tiptap-editor/extension-bundle'
  
  import { convertBase64ToBlob } from './uploadHelpers'
  
  const extensions = [
    BaseKit.configure({
      placeholder: { showOnlyCurrent: true },
      characterCount: { limit: 50_000 },
    }),
    History,
    SearchAndReplace,
    TableOfContents,
    FormatPainter.configure({ spacer: true }),
    Clear,
    FontFamily,
    Heading.configure({ spacer: true }),
    FontSize,
    Bold,
    Italic,
    Underline,
    Strike,
    MoreMark,
    Katex,
    Emoji,
    Color.configure({ spacer: true }),
    Highlight,
    BulletList,
    OrderedList,
    TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
    Indent,
    LineHeight,
    TaskList.configure({
      spacer: true,
      taskItem: { nested: true },
    }),
    Link,
    Image.configure({
      upload: (file) => new Promise(resolve => {
        setTimeout(() => resolve(URL.createObjectURL(file)), 500)
      }),
    }),
    Video.configure({
      upload: (file) => new Promise(resolve => {
        setTimeout(() => resolve(URL.createObjectURL(file)), 500)
      }),
    }),
    ImageGif.configure({
      GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY as string,
    }),
    Blockquote,
    SlashCommand,
    HorizontalRule,
    Code.configure({ toolbar: false }),
    CodeBlock,
    ColumnActionButton,
    Table,
    Iframe,
    ExportPdf.configure({ spacer: true }),
    ImportWord.configure({
      upload: (files) => Promise.resolve(files.map(file => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }))),
    }),
    ExportWord,
    Excalidraw,
    TextDirection,
    Mention,
    Attachment.configure({
      upload: (file) => new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }
      }),
    }),
    Mermaid.configure({
      upload: (file) => new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }
      }),
    }),
    Drawer.configure({
      upload: (file) => new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }
      }),
    }),
    Twitter,
  ]
  
  export default extensions;
  