import { AUTH_TOKEN_KEY_NAME } from "@/consts";
import AuthContext from "@/context/authContext";
import Layout from "@/layout";
import "@/styles/globals.css";
import { parseCookies } from "@/utils/parseCookies";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const cookies = parseCookies(pageProps?.serverCookies || "");
  const token = cookies[AUTH_TOKEN_KEY_NAME];

  const [isAuth, setIsAuth] = useState<boolean | undefined>(
    Boolean(token) || false
  );

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  );
}
