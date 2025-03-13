"use client";

import { UsersCard } from "./elements/users-card";
import { getUsers } from "@/services/endpoints/users";
import useSWR, { mutate } from "swr";
import { SWR_KEY_USERS } from "@/consts";
import { UsersFilter } from "./elements/users-filter";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function Users() {
  const router = useRouter();
  const { data } = useSWR(SWR_KEY_USERS, () => getUsers(), {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      const reversedData = [...data].reverse();
      mutate(SWR_KEY_USERS, reversedData, false);
    }

    console.log("Search поменял значение ====");
  }, [router.query.search]);

  return (
    <div className="container py-8">
      <h1 className="text-[40px] font-bold mb-[32px]">Список пользователей</h1>
      <UsersFilter />
      <div className="grid grid-cols-4 gap-4">
        {data?.map(({ id, first_name, email, avatar }) => (
          <UsersCard key={id} name={first_name} email={email} img={avatar} />
        ))}
      </div>
    </div>
  );
}
