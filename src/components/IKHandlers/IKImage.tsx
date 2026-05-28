"use client";

import React from "react";
import { IKImage } from "imagekitio-next";

interface IKImageComponentProps {
  src: string;
  className?: string;
  w?: number;
  h?: number;
  alt?: string;
}

const IKImageComponent: React.FC<IKImageComponentProps> = ({
  src,
  className,
  w,
  h,
  alt = "",
}) => {
  return (
    <IKImage
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={w || h ? [{ width: String(w), height: String(h) }] : []}
    />
  );
};

export default IKImageComponent;
