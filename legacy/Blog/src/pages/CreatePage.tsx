"use client";

import Logout from "../components/Logout";
import RichEditor from "../components/RichEditor";
import axios from "axios";
import { useState } from "react";
import FileUpload, { UploadResponse } from "../components/IKHandlers/FIleUpload";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useNotification } from "../components/Notification";

interface BlogPostData {
  title: string;
  description: string;
  imageUrl: string;
  content: string;
}

const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<BlogPostData>({
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      content: "",
    },
  });

  const handleUploadSuccess = (res: UploadResponse) => {
    setValue("imageUrl", res.filePath);
    setImagePreview(res.filePath);
    showNotification("Image uploaded successfully", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: BlogPostData) => {
    if (!data.imageUrl) {
      showNotification("Please upload an image first", "error");
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("No token found");
        return;
      }

      await axios.post("http://localhost:8080/api/v1/post/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showNotification("Post created successfully", "success");

      // Reset form
      setValue("title", "");
      setValue("description", "");
      setValue("imageUrl", "");
      setValue("content", "");
      setImagePreview(null);
      setUploadProgress(0);
    } catch (error) {
      const errorMsg =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to publish post";
      showNotification(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 py-10">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Upload Image */}
          <FileUpload onSuccess={handleUploadSuccess} />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded-md border"
            />
          )}

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className={`p-2 border-4 rounded-md ${
              errors.description ? "border-red-500" : "border-gray-500"
            }`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          {/* Description */}
          <textarea
            placeholder="Description"
            className={`p-2 border-4 rounded-md ${
              errors.description ? "border-red-500" : "border-gray-500"
            }`}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          {/* Rich Text Editor */}
          <Controller
            control={control}
            name="content"
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <RichEditor content={field.value} setContent={field.onChange} />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="text-lg bg-gray-600 text-white py-3 rounded-md mt-4 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Post"
            )}
          </button>
        </form>

        {/* Logout */}
        <div className="flex justify-end">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
