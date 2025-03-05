import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased pt-[var(--header-height)] min-h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
