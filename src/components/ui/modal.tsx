"use client";

import Image from "next/image";
import { ReactNode, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ children, onClose, isOpen }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-white tablet:bg-transparent">
        <div className="flex min-h-full justify-center p-4 tablet:items-center">
          <div className="relative pt-[56px] tablet:py-[48px] tablet:px-[40px] overflow-hidden rounded-lg bg-white text-left w-[500px] max-w-full">
            <button
              onClick={onClose}
              className="absolute right-3 top-3 hover:text-blue-500 bg-gray-500 rounded-full p-1 hover:bg-black"
            >
              <Image src="/close.svg" alt="close icon" width={24} height={24} />
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
