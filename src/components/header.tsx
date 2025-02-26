import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components";

export function Header() {
  return (
    <header className="fixed flex top-0 right-0 left-0 h-header bg-gray-200">
      <div className="container flex items-center">
        <Link href="/">
          <Image src="/vite.svg" alt="vite logo" width={32} height={32} />
        </Link>
        <Button text="Войти" />
      </div>
    </header>
  );
}
