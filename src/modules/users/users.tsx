"use client";

import { getUsers } from "@/services/endpoints/users";
import useSWR from "swr";
import { SWR_KEY_USERS } from "@/consts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFilteredUsers } from "@/utils/filter-users";
import { UsersCard, UsersCreate, UsersFilter } from "./elements";
import { useAuth } from "@/hooks/use-auth";
import { UserCreateData } from "@/types/users";

export function Users() {
  const router = useRouter();
  // создание и удаление карточек, только если авторизован
  const { isAuth } = useAuth();
  const { data, isLoading } = useSWR(SWR_KEY_USERS, () => getUsers(), {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  const [usersData, setUsersData] = useState(data || []);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // фильтрация только на клиенте, данные всегда тянутся с SWR, даже если мы удаляем карточки
    if (Array.isArray(data)) {
      const filteredData = getFilteredUsers(String(router.query.search || ""), [
        ...data,
      ]);
      setUsersData(filteredData);
    }
  }, [data, router.query.search]);

  useEffect(() => {
    // если пусто выводим заглушку
    setIsEmpty(Boolean(!usersData.length));
  }, [usersData]);

  const handleDelete = (id: number) => {
    const filtered = usersData.filter((item) => item.id !== id);
    setUsersData(filtered);
  };

  const handleCreateUser = (user: UserCreateData) => {
    const newUser = {
      ...user,
    }
    console.log(newUser)
  }

  return (
    <div className="container py-8">
      <h1 className="text-[40px] font-bold mb-[32px]">Список пользователей</h1>
      <div className="flex">
        <UsersFilter />
        {isAuth && <UsersCreate onCreatedUser={(data) => handleCreateUser(data)} />}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {!isLoading &&
          usersData?.map(({ id, first_name, email, avatar, last_name }) => (
            <UsersCard
              key={id}
              name={first_name}
              email={email}
              img={avatar}
              lastName={last_name}
              onClickDelete={() => handleDelete(id)}
            />
          ))}
        {!isLoading && isEmpty && <p>Ничего не найдено</p>}
      </div>
    </div>
  );
}
