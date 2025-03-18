import { SWR_KEY_USERS } from "@/consts";
import { Users } from "@/modules";
import { getUsers } from "@/services/endpoints/users";
import { FilterSearch } from "@/types/filter";
import { getSwrKeyByQueryParams } from "@/utils/filter-users";
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
  // payload для запроса getUsers
  const filters: FilterSearch = {};
  
  if (typeof context.query.search === "string") {
    filters.search = context.query.search;
  }

  const routeQuery = getSwrKeyByQueryParams(context.query)
  const swrKey = `${SWR_KEY_USERS}/${routeQuery}`;

  try {
    const dataUsers = await getUsers(filters);

    return {
      props: {
        serverCookies: context.req.headers?.cookie || "",
        fallback: {
          [swrKey]: dataUsers,
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
