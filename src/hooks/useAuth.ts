'use client';

import { useAuthContext } from "@/context/auth-context";
import { getToken } from "@/services/token";
import { useEffect } from "react";

export const useAuth = () => {
  const { isAuth, setIsAuth } = useAuthContext();

  useEffect(() => {
    const token = getToken();
    setIsAuth(Boolean(token));
  });

  return { isAuth, setIsAuth };
};
