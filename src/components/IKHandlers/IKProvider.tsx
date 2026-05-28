"use client";

import React from "react";
import { IKContext } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

const authenticator = async () => {
  const res = await fetch("/api/imagekit-auth");
  if (!res.ok) {
    throw new Error("Failed to fetch ImageKit auth parameters");
  }
  const { signature, token, expire } = await res.json();
  return { signature, token, expire };
};

const IKProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      {children}
    </IKContext>
  );
};

export default IKProvider;
