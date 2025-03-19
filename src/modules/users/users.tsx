"use client";

import { deleteUser, getUsers } from "@/services/endpoints/users";
import useSWR from "swr";
import { AppRouterPages, SWR_KEY_USERS } from "@/consts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSwrKeyByQueryParams } from "@/utils/filter-users";
import { UsersCard, UsersCreate, UsersFilter } from "./elements";
import { useAuth } from "@/hooks/use-auth";
import { UserCreateData } from "@/types/users";
import { FilterSearch } from "@/types/filter";

export function Users() {
  const router = useRouter();
  // создание и удаление карточек, только если авторизован
  const { isAuth } = useAuth();
  const filters: FilterSearch = {};

  if (typeof router.query.search === "string") {
    filters.search = router.query.search;
  }

  const routeQuery = getSwrKeyByQueryParams(router.query);
  const swrKey = `${SWR_KEY_USERS}/${routeQuery}`;

  const { data, isLoading, mutate } = useSWR(swrKey, () => getUsers(filters), {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  const [usersData, setUsersData] = useState(data || []);
  const [isEmpty, setIsEmpty] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>();

  useEffect(() => {
    // если пусто выводим заглушку
    setIsEmpty(Boolean(!usersData.length));
  }, [usersData]);

  useEffect(() => {
    if (data) {
      setUsersData(data);
    }
  }, [data]);

  const handleDelete = async (id: number) => {
    setIdToDelete(id);
    try {
      await deleteUser({ id: String(id) });
      const filtered = usersData.filter((item) => item.id !== id);
      setUsersData(filtered);
    } finally {
      setIdToDelete(undefined);
    }
  };

  const handleCreateUser = (user: UserCreateData) => {
    const id = new Date().getTime();
    const newUser = {
      ...user,
      avatar: "",
      id,
      isNotLink: true,
    };
    if (data) {
      mutate([...data, newUser], {revalidate: false})
    }
  };

  const handleFilter = ({ search }: FilterSearch) => {
    // записываем квери параметры
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="container py-8">
      <h1 className="text-[24px] desktop:text-[40px] font-bold mb-[32px]">Список пользователей</h1>
      <div className="desktop:flex">
        <UsersFilter onSubmit={(data) => handleFilter(data)} />
        {isAuth && (
          <UsersCreate onCreatedUser={(data) => handleCreateUser(data)} />
        )}
      </div>
      <div className="grid tablet:grid-cols-2 desktop:grid-cols-4 gap-4">
        {usersData?.map(
          ({ id, first_name, email, avatar, last_name, isNotLink }) => (
            <UsersCard
              key={id}
              href={isNotLink ? undefined : `${AppRouterPages.Users}/${id}`}
              name={first_name}
              email={email}
              img={avatar}
              lastName={last_name}
              isAuth={isAuth}
              onClickDelete={() => handleDelete(id)}
              isLoading={idToDelete === id}
            />
          )
        )}
        {!isLoading && isEmpty && <p>Ничего не найдено</p>}
      </div>
    </div>
  );
}
