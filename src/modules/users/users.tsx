"use client";

import { getUsers } from "@/services/endpoints/users";
import useSWR from "swr";
import { SWR_KEY_USERS } from "@/consts";
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

  const { data, isLoading } = useSWR(swrKey, () => getUsers(filters), {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  const [usersData, setUsersData] = useState(data || []);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // если пусто выводим заглушку
    setIsEmpty(Boolean(!usersData.length));
  }, [usersData]);

  useEffect(() => {
    if (data) {
      setUsersData(data);
    }
  }, [data]);

  const handleDelete = (id: number) => {
    const filtered = usersData.filter((item) => item.id !== id);
    setUsersData(filtered);
  };

  const handleCreateUser = (user: UserCreateData) => {
    const id = new Date().getTime();
    const newUser = {
      ...user,
      avatar: "",
      id,
      isNotLink: true,
    };
    setUsersData([...usersData, newUser]);
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
      <h1 className="text-[40px] font-bold mb-[32px]">Список пользователей</h1>
      <div className="flex">
        <UsersFilter onSubmit={(data) => handleFilter(data)} />
        {isAuth && (
          <UsersCreate onCreatedUser={(data) => handleCreateUser(data)} />
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {usersData?.map(({ id, first_name, email, avatar, last_name }) => (
          <UsersCard
            key={id}
            name={first_name}
            email={email}
            img={avatar}
            lastName={last_name}
            isAuth={isAuth}
            onClickDelete={() => handleDelete(id)}
          />
        ))}
        {!isLoading && isEmpty && <p>Ничего не найдено</p>}
      </div>
    </div>
  );
}
