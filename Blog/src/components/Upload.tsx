import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

type UploadProps = {
  children: React.ReactNode;
  type: "image" | "video";
  setProgress: (progress: number) => void;
  setData: (url: string) => void;
  setPreview?: (previewUrl: string) => void;
};

const authenticator = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/post/uploadAuth"
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch authentication data");
  }
};

const Upload = ({ children, type, setProgress, setData, setPreview }: UploadProps) => {
  const uploadRef = useRef<any>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file && setPreview) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="upload"
        useUniqueFileName
        onError={(err) => {
          console.error(err);
          toast.error("Image upload failed!");
        }}
        onSuccess={(res) => {
          console.log("Upload success:", res);
          setData(res.url); // <- sets imageUrl
          toast.success("Image uploaded successfully!");
        }}
        onUploadProgress={(progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          setProgress(percent);
        }}
        onChange={handleFileChange}
        accept={`${type}/*`}
        className="hidden"
        ref={uploadRef}
      />
      <div className="cursor-pointer" onClick={() => uploadRef.current?.click()}>
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
