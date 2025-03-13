"use client";

import { UserCard } from "./elements/user-card";

import { useUsers } from "@/services/hooks/useUsers";

export function Users() {
  const { data: dataUsers } = useUsers();

  return (
    <div className="container py-8">
      <h1 className="text-[40px] font-bold mb-[32px]">Список пользователей</h1>
      <div className="grid grid-cols-4 gap-4">
        {dataUsers?.map(({ id, first_name, email, avatar }) => (
          <UserCard key={id} name={first_name} email={email} img={avatar} />
        ))}
      </div>
    </div>
  );
}
