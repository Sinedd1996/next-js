import { Users } from "@/modules";
import { apiAxios } from "@/services/api";
import { UserList } from "@/types/users";
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

type UsersResponse = {
  data: UserList;
};

export async function getStaticProps() {
  try {
    const { data } = await apiAxios.get<UsersResponse>("/api/users");

    return {
      props: {
        fallback: {
          "/api/users": data,
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
