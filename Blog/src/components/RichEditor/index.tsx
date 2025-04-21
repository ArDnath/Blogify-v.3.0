import { useCallback, useEffect, useState } from "react";
import RichTextEditor from "reactjs-tiptap-editor";
import "reactjs-tiptap-editor/style.css";
import "katex/dist/katex.min.css";
import "easydrawer/styles.css";

import { useTheme } from "../ThemeContext";
import extensions from "./extensions";
import { DEFAULT, debounce } from "./constants";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";

function RichEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(DEFAULT);
  const [disable, setDisable] = useState(false);
  const [editorTheme, setEditorTheme] = useState("");
  const [status, setStatus] = useState("");

  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setEditorTheme(theme === "nord" ? "light" : "dark");
  }, [theme]);

  const onValueChange = useCallback(
    debounce((value: string) => setContent(value), 300),
    [],
  );

  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("Token being sent:", token);

      if (!token) {
        return setStatus("No token found");
      }

      const res = await axios.post(
        "http://localhost:8080/api/v1/post/create",
        {
          title,
          description: content, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus("Blog posted successfully!");
      setTitle("");
      setContent(DEFAULT);
    } catch (err: any) {
      console.error(err);
      setStatus("Failed to create post");
    }
  };

  return (
    <div
      className="p-[24px] flex flex-col w-full max-w-screen-lg gap-[24px] mx-auto my-0"
      style={{ maxWidth: 1024, margin: "40px auto" }}
    >
      <h2 className="text-2xl font-bold">Create a New Blog Post</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border-4 border-gray-500 rounded-md"
      />

      <RichTextEditor
        output="html"
        content={content}
        onChangeContent={onValueChange}
        extensions={extensions}
        dark={editorTheme === "dark"}
        disabled={disable}
      />

      <button
        onClick={handleSubmit}
        disabled={!isAuthenticated}
        className="text-lg bg-gray-600 text-white py-3 rounded-md mt-4"
      >
        Publish Post
      </button>

      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  );
}

export default RichEditor;
