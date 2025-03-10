"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export function ErrorToast() {
  const error = useSelector(
    (state: RootState) => state.errorMessage.errorMessage
  );

  return error ? (
    <div className="fixed bottom-6 right-6 bg-red-500 p-3 rounded-lg text-white max-w-[320px]">
      {error}
    </div>
  ) : null;
}
