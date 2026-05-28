import React from 'react';
import { IKContext } from 'imagekitio-react';
import axios from 'axios';

const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;
const publicKey = import.meta.env.VITE_IK_PUBLIC_KEY;

const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authenticator = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/post/uploadAuth");
      const { signature, token, expire } = res.data;
      return { signature, token, expire };
    } catch (error: any) {
      throw new Error(`Error fetching authentication: ${error?.response?.data || error.message}`);
    }
  };

  return (
    <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
      {children}
    </IKContext>
  );
};

export default UploadProvider;
