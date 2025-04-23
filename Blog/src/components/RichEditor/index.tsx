import { useCallback, useEffect, useState } from "react";
import RichTextEditor from "reactjs-tiptap-editor";
import "reactjs-tiptap-editor/style.css";
import "katex/dist/katex.min.css";
import "easydrawer/styles.css";

import { useTheme } from "../ThemeContext";
import extensions from "./extensions";
import { debounce } from "./constants";

interface RichEditorProps {
  content: string;
  setContent: (value: string) => void;
}

function RichEditor({ content, setContent }: RichEditorProps) {
  const [editorTheme, setEditorTheme] = useState(""); // Define editorTheme state
  const { theme } = useTheme();

  useEffect(() => {
    setEditorTheme(theme === "nord" ? "light" : "dark"); // Update editorTheme based on theme
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
      dark={editorTheme === "dark"} // Use editorTheme here
    />
   </div>
  );
}

export default RichEditor;
