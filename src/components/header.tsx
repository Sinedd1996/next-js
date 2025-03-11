import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components";
import { AppRouterPages } from "@/consts";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  {
    title: "На главную",
    url: AppRouterPages.Main,
  },
  {
    title: "Пользователи",
    url: AppRouterPages.Users,
  },
];

export function Header() {
  const { isAuth } = useAuth();
  const { pathname } = useRouter();
  const isLoginPage = pathname === AppRouterPages.Login;

  const userLink = {
    title: isAuth ? "Профиль" : "Войти",
    url: isAuth ? AppRouterPages.Profile : AppRouterPages.Login,
  };

  return (
    <header className="fixed top-0 right-0 left-0 h-header bg-gray-200">
      <div className="container flex h-header justify-between items-center">
        <Link href={AppRouterPages.Main}>
          <Image src="/vite.svg" alt="vite logo" width={32} height={32} />
        </Link>
        {!isLoginPage && (
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="text-[15px] link-hover"
              >
                {item.title}
              </Link>
            ))}
            <Link
              key={userLink.title}
              href={userLink.url}
              passHref
              legacyBehavior
            >
              <Button as="a" text={userLink.title} additionalClassName="ml-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
