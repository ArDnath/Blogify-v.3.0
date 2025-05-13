import { Attachment } from 'reactjs-tiptap-editor/attachment';
import { BaseKit } from 'reactjs-tiptap-editor';
import { Blockquote } from 'reactjs-tiptap-editor/blockquote';
import { Bold } from 'reactjs-tiptap-editor/bold';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Clear } from 'reactjs-tiptap-editor/clear';
import { Code } from 'reactjs-tiptap-editor/code';
import { CodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { Color } from 'reactjs-tiptap-editor/color';
import { ColumnActionButton } from 'reactjs-tiptap-editor/multicolumn';
import { Emoji } from 'reactjs-tiptap-editor/emoji';
import { ExportPdf } from 'reactjs-tiptap-editor/exportpdf';
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { FormatPainter } from 'reactjs-tiptap-editor/formatpainter';
import { Heading } from 'reactjs-tiptap-editor/heading';
import { Highlight } from 'reactjs-tiptap-editor/highlight';
import { History } from 'reactjs-tiptap-editor/history';
import { HorizontalRule } from 'reactjs-tiptap-editor/horizontalrule';
import { Iframe } from 'reactjs-tiptap-editor/iframe';
import { Image } from 'reactjs-tiptap-editor/image';
import { ImageGif } from 'reactjs-tiptap-editor/imagegif';
import { ImportWord } from 'reactjs-tiptap-editor/importword';
import { Indent } from 'reactjs-tiptap-editor/indent';
import { Italic } from 'reactjs-tiptap-editor/italic';
import { Katex } from 'reactjs-tiptap-editor/katex';
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
import { Link } from 'reactjs-tiptap-editor/link';
import { Mention } from 'reactjs-tiptap-editor/mention';
import { Mermaid } from 'reactjs-tiptap-editor/mermaid';
import { MoreMark } from 'reactjs-tiptap-editor/moremark';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
import { SlashCommand } from 'reactjs-tiptap-editor/slashcommand';
import { Strike } from 'reactjs-tiptap-editor/strike';
import { Table } from 'reactjs-tiptap-editor/table';
import { TableOfContents } from 'reactjs-tiptap-editor/tableofcontent';
import { TaskList } from 'reactjs-tiptap-editor/tasklist';
import { TextAlign } from 'reactjs-tiptap-editor/textalign';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { Twitter } from 'reactjs-tiptap-editor/twitter';
import { Video } from 'reactjs-tiptap-editor/video';
import { Drawer } from 'reactjs-tiptap-editor/drawer';

  
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
    TextUnderline,
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
      upload: (file : File) => new Promise(resolve => {
        setTimeout(() => resolve(URL.createObjectURL(file)), 500)
      }),
    }),
    Video.configure({
      upload: (file: File) => new Promise(resolve => {
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
      upload: (files: File[]) => Promise.resolve(files.map(file => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }))),
    }),
    TextDirection,
    Mention,
    Attachment.configure({
      upload: (file : File) => new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }
      }),
    }),
    Mermaid.configure({
      upload: (file:File) => new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }
      }),
    }),
    Drawer.configure({
      upload: (file : File) => new Promise(resolve => {
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
  