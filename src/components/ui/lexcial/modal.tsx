"use client";

import * as React from "react";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function ProtalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside,
}: {
  children: ReactNode;
  closeOnClickOutside: boolean;
  onClose: () => void;
  title: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target;
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(target as Node) &&
        closeOnClickOutside
      ) {
        onClose();
      }
    };

    const modalElement = modalRef.current;
    if (modalElement !== null) {
      modalOverlayElement = modalElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener("click", clickOutsideHandler);
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener("click", clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);

  return (
    <div className="flex justify-center items-center fixed flex-col top-0 bottom-0 left-0 right-0 bg-[#282828] z-50 grow-0 shrink">
      <div
        className="p-5 min-h-[100px] min-w-[300px] flex grow-0 bg-white flex-col relative shadow-sm shadow-[#444] rounded-sm"
        tabIndex={-1}
        ref={modalRef}
      >
        <h2 className="text-[#444] m-0 pb-2 border-b-2 border-b-[#ccc]">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="border-none absolute right-5 rounded-md justify-center items-center flex w-7 h-7 text-center bg-[#eee] cursor-pointer hover:bg-[#ddd]"
        >
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function Modal({
  onClose,
  children,
  title,
  closeOnClickOutside = false,
}: {
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
  title: string;
}): JSX.Element {
  return createPortal(
    <ProtalImpl
      onClose={onClose}
      title={title}
      closeOnClickOutside={closeOnClickOutside}
    >
      {children}
    </ProtalImpl>,
    document.body
  );
}
