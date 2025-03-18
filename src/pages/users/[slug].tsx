import { SWR_KEY_USERS } from "@/consts";
import { User } from "@/modules";
import { getUserDetail, getUsers } from "@/services/endpoints/users";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { SWRConfig } from "swr";

export default function UserPage({
  fallback,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const swrKey = `${SWR_KEY_USERS}/${slug}`;
  let title = fallback[swrKey].first_name || '';

  if (fallback[swrKey].last_name) {
    title = title + ' ' + fallback[swrKey].last_name
  }

  return (
    <>
      <Head>
        <title>{title || 'Пользователь'}</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <User slug={slug} />
      </SWRConfig>
    </>
  );
}

export const getStaticPaths = (async () => {
  const dataUsers = await getUsers();
  const paths: { params: { slug: string } }[] = [];

  dataUsers.forEach(({ id }) => {
    if (id) {
      paths.push({
        params: {
          slug: id.toString(),
        },
      });
    }
  });

  console.log(paths, " user getStaticPaths");

  return {
    paths,
    // если нет slug перекинет на 404
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  try {
    const id = String(params?.slug);
    const dataUser = await getUserDetail({ id });
    const swrKey = `${SWR_KEY_USERS}/${id}`;

    return {
      props: {
        fallback: {
          [swrKey]: dataUser,
        },
        slug: id,
      },
    };
  } catch (error) {
    console.log("ошибка /api/users/id", error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps;
