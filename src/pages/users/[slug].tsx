// import { SWR_KEY_USERS } from "@/consts";
import { Users } from "@/modules";
import { getUsers } from "@/services/endpoints/users";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { SWRConfig } from "swr";

export default function UserPage({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SWRConfig value={{ fallback }}>
      <Users />
    </SWRConfig>
  );
}

export const getStaticPaths = (async () => {
  const dataUsers = await getUsers();

  return {
    paths: 
      dataUsers.map((item) =>  (
        {
          params: {
            slug: item.id.toString()
          }
        }
      ))
    ,
    fallback: true,
  }
}) satisfies GetStaticPaths

export const getStaticProps: GetStaticProps = (async (context) => {
  try {
    console.log(context.params, ' context')

    return {
      props: {
        // fallback: {
        //   // [SWR_KEY_USERS]: dataUsers,
        // },
      },
    };
  } catch (error) {
    console.log("ошибка /api/users", error);
    return {
      notFound: true,
    };
  }
})
 
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return { props: { serverCookies: context.req.headers?.cookie || "" } };
// };


// export const getServerSideProps = (async (context) => {
// }) satisfies GetServerSideProps;