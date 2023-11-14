"use client";

import * as React from "react";
import { Suspense, useRef } from "react";

import NextImage from "next/image";

const imageCache = new Set();

function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

function LazyImage({
  altText,
  imageRef,
  src,
}: {
  altText: string;
  className?: string | null;
  imageRef: { current: null | HTMLImageElement };
  src: string;
}): JSX.Element {
  useSuspenseImage(src);
  return (
    <NextImage
      fill={true}
      ref={imageRef}
      src={src}
      alt={altText}
      sizes="inherit"
      draggable="false"
    />
  );
}

export default function ImageComponent({
  src,
  altText,
  height,
  width,
  maxWidth,
}: {
  altText: string;
  height: "inherit" | number;
  maxWidth: number;
  src: string;
  width: "inherit" | number;
}): JSX.Element {
  const imageRef = useRef<null | HTMLImageElement>(null);
  console.log("height", height);

  return (
    <Suspense fallback={null}>
      <div
        className="relative h-[300px]"
        style={{
          width,
          maxWidth,
        }}
      >
        <LazyImage src={src} altText={altText} imageRef={imageRef} />
      </div>
    </Suspense>
  );
}
