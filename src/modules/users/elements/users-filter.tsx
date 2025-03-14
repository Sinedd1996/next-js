"use client";

import { Button, Input } from "@/components";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export function UsersFilter() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(router.query?.search || "");

  useEffect(() => {
    setInputValue(router.query.search || "");
  }, [router.query.search]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search: inputValue },
      },
      undefined,
      { shallow: true }
    );
  };

  const resetFilter = () => {
    setInputValue("");
    router.replace(router.pathname, undefined, { shallow: true });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-[32px]">
      <div className="w-[320px]">
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Поиск пользователей"
          maxLength={30}
        />
      </div>
      <Button text="Найти" />
      {inputValue && (
        <button type="button" onClick={() => resetFilter()}>
          Сбросить поиск
        </button>
      )}
    </form>
  );
}
