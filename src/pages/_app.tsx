import AuthContext from "@/context/authContext";
import Layout from "@/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(pageProps.isAuth || false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  );
}
