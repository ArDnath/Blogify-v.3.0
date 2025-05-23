import { useCallback, useEffect, useState } from "react";
import RichTextEditor from "reactjs-tiptap-editor";
import "reactjs-tiptap-editor/style.css";
import "katex/dist/katex.min.css";
import "easydrawer/styles.css";

import { useTheme } from "../ui/ThemeContext";
import extensions from "./extensions";
import { debounce } from "./constants";

interface RichEditorProps {
  content: string;
  setContent: (value: string) => void;
}

function RichEditor({ content, setContent }: RichEditorProps) {
  const [editorTheme, setEditorTheme] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    setEditorTheme(theme === "nord" ? "light" : "dark"); 
  }, [theme]);

  const onValueChange = useCallback(
    debounce((value: string) => setContent(value), 300),
    [setContent]
  );

  return (
   <div>
     <RichTextEditor
      output="html"
      content={content}
      onChangeContent={onValueChange}
      extensions={extensions}
      dark={editorTheme === "dark"} 
    />
   </div>
  );
}

export default RichEditor;
