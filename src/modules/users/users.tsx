"use client";

import { SWR_KEY_USERS } from "@/consts";
import { fetcherSwr } from "@/services/api";
import useSWR from "swr";
import { UserCard } from "./elements/user-card";
import { UserList } from "@/types/users";

export function Users() {
  const { data } = useSWR<UserList>(SWR_KEY_USERS, fetcherSwr, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });
  const cardList = data?.data || [];

  return (
    <div className="container py-8">
      <h1 className="text-[40px] font-bold mb-[32px]">Список пользователей</h1>
      <div className="grid grid-cols-4 gap-4">
        {cardList.map(({ id, first_name, email, avatar }) => (
          <UserCard key={id} name={first_name} email={email} img={avatar} />
        ))}
      </div>
    </div>
  );
}
