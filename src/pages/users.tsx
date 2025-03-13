import { SWR_KEY_USERS } from "@/consts";
import { Users } from "@/modules";
import { getUsers } from "@/services/endpoints/users";
import { InferGetStaticPropsType } from "next";
import { SWRConfig } from "swr";

export default function UsersPage({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SWRConfig value={{ fallback }}>
      <Users />
    </SWRConfig>
  );
}

export async function getStaticProps() {
  try {
    const dataUsers = await getUsers();

    return {
      props: {
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
}
