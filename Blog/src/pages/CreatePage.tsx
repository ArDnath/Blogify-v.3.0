import Logout from "../components/Logout";
import RichEditor from "../components/RichEditor/index";
import axios from "axios";
import { useState } from "react";
import Upload from "../components/IKHandlers/UploadProvider"; 


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState("");



  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("No token found");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/v1/post/create",
        { title, description, content , image: imageUrl},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog posted successfully!");
      setTitle("");
      setDescription("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 py-10 ">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
      <Upload
  type="image"
  setProgress={setProgress}
  setData={setImageUrl}
  setPreview={setImagePreview}
>
  <div className="text-white bg-blue-600 px-4 py-2 rounded-md inline-block cursor-pointer">
    {imageUrl ? "Change Image" : "Upload Image"}
  </div>
</Upload>

{imagePreview && (
  <img
    src={imagePreview}
    alt="Preview"
    className="mt-4 w-32 h-32 object-cover rounded-md border"
  />
)}

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border-4 border-gray-500 rounded-md"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border-4 border-gray-500 rounded-md"
        />
        <RichEditor content={content} setContent={setContent} />
        <button
          onClick={handleSubmit}
          className="text-lg bg-gray-600 text-white py-3 rounded-md mt-4"
        >
          Publish Post
        </button>
        <div className="flex justify-end">
          <Logout />
        </div>
        
      </div>
    </div>
  );
};

export default CreatePage;
