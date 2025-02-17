import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed flex top-0 right-0 left-0 h-header">
      <Link href="/">
        <Image src="/vite.svg" alt="vite logo" width={32} height={32} />
      </Link>
    </header>
  );
}
