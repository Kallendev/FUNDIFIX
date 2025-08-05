// src/hooks/use-toast.ts
"use client";

import { toast } from "sonner";

export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 3000,
      position: "top-center",
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 3000,
      position: "top-center",
    });
  };

  const showInfo = (message: string) => {
    toast(message, {
      duration: 3000,
      position: "top-center",
    });
  };

  // ✅ Now include 'toast' itself in the returned object
  return { showSuccess, showError, showInfo, toast };
};
