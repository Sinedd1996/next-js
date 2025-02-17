
import Header from "@/components/header/header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <main>
          <Header />
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
