import { SWR_KEY_USERS } from "@/consts";
import { Users } from "@/modules";
import { getUsers } from "@/services/endpoints/users";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SWRConfig } from "swr";

export default function UsersPage({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SWRConfig value={{ fallback }}>
      <Users />
    </SWRConfig>
  );
}

export const getServerSideProps = (async (context) => {
  try {
    const dataUsers = await getUsers();

    return {
      props: {
        serverCookies: context.req.headers?.cookie || "",
        fallback: {
          [SWR_KEY_USERS]: dataUsers,
        },
      },
    };
  } catch (error) {
    console.log("ошибка /api/users", error);
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps;
