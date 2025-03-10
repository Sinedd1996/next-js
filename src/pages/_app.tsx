import { ErrorToast } from "@/components/ui/error-toast";
import { AUTH_TOKEN_KEY_NAME } from "@/consts";
import AuthContext from "@/context/authContext";
import Layout from "@/layout";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { parseCookies } from "@/utils/parseCookies";
import type { AppProps } from "next/app";
import { useState } from "react";

import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const cookies = parseCookies(pageProps?.serverCookies || "");
  const token = cookies[AUTH_TOKEN_KEY_NAME];

  const [isAuth, setIsAuth] = useState<boolean | undefined>(
    Boolean(token) || false
  );

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ErrorToast />
      </AuthContext.Provider>
    </Provider>
  );
}
