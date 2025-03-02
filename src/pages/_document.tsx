
import { Header } from "@/components";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased pt-[var(--header-height)] min-h-full">
        <Header />
        <main>
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
