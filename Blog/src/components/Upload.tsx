import { IKContext, IKUpload} from "imagekitio-react";
import { Children, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

type UploadProps = {
    children: React.ReactNode;
    type: "image" | "video";
    setProgress: (progress: number) => void;
    setData: (url: string) => void;
  };
  
const authenticator = async()=>{
    try {
        const response = await axios.get(
            "http://localhost:8080/api/v1/post/auth/imagekit",
        );

        return response.data;
    } catch (error :any) {
        error.response?.data?.message || error.message;
        throw new Error("Failed to fetch authentication data");
    }
};


const Upload = ({ children, type, setProgress, setData }: UploadProps) => {
    const ref = useRef<any>(null);
  
    const onError = (err: any) => {
      console.error(err);
      toast.error("Image upload failed!");
    };
  
    
const onSuccess = (res: any) => {
    console.log("Upload success:", res);
    setData(res.url); // Send only the URL string instead of full response
    toast.success("Image uploaded successfully!");
  };
  
    const onUploadProgress = (progress: ProgressEvent) => {
      const percent = Math.round((progress.loaded / progress.total) * 100);
      setProgress(percent);
    };
  
    return (
      <IKContext
        publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        authenticator={authenticator}
      >
        <IKUpload
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          className="hidden"
          ref={ref}
          accept={`${type}/*`}
        />
        <div className="cursor-pointer" onClick={() => ref.current?.click()}>
          {children}
        </div>
      </IKContext>
    );
  };
  
  export default Upload;