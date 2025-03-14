import { Button } from "@/components";
import { AppRouterPages } from "@/consts";
import { useAuth } from "@/hooks/use-auth";
import { deleteToken } from "@/services/token";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();
  const { setIsAuth } = useAuth();

  const handleLogout = () => {
    // удаляем токен
    deleteToken();
    // в приложении меняем состояние авторизации
    setIsAuth(false);
    router.push(AppRouterPages.Main);
  };

  return (
    <div className="container py-4">
      <h1>Павел Дуров</h1>
      <p className="mb-4">Ваша почта: example@mail.ru</p>
      <Button text="Выйти" onClick={handleLogout} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps  = async (context) => {
  return { props: { serverCookies: context.req.headers?.cookie || ''} };
};
