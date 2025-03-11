import { ErrorToast } from "@/components/ui/error-toast";
import { AUTH_TOKEN_KEY_NAME } from "@/consts";
import { AuthContextProvider } from "@/context/auth-context";
import Layout from "@/layout";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { parseCookies } from "@/utils/parse-cookies";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const cookies = parseCookies(pageProps?.serverCookies || "");
  const token = cookies[AUTH_TOKEN_KEY_NAME];

  return (
    <Provider store={store}>
      <AuthContextProvider isAuthProp={Boolean(token)}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ErrorToast />
      </AuthContextProvider>
    </Provider>
  );
}
