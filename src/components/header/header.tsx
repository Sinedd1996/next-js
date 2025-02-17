import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Image
        src="/vite.svg"
        alt="vite logo"
        width={32}
        height={32}
      />
    </header>
  );
}
