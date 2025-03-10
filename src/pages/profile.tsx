import { Button } from "@/components";
import { AppRouterPages } from "@/consts";
import AuthContext from "@/context/authContext";
import { deleteToken } from "@/services/token";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { setIsAuth } = useContext(AuthContext);

  const handleLogout = () => {
    // записываем токен в куки
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
