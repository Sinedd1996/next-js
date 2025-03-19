"use client";

import { Button, Input } from "@/components";
import { FilterSearch } from "@/types/filter";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

type UsersFilterProps = {
  onSubmit: (data: FilterSearch) => void
}

export function UsersFilter({ onSubmit } : UsersFilterProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(String(router.query?.search || ""));

  useEffect(() => {
    setInputValue(String(router.query.search || ""));
  }, [router.query.search]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    onSubmit({ search: inputValue })
  };

  const resetFilter = () => {
    setInputValue("");
    router.replace(router.pathname, undefined, { shallow: true });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-[32px]">
      <div className="w-full tablet:w-[320px]">
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Поиск пользователей"
          maxLength={30}
        />
      </div>
      <Button text="Найти" className="h-[48px]" />
      {inputValue && (
        <button type="button" onClick={() => resetFilter()}>
          Сбросить фильтр
        </button>
      )}
    </form>
  );
}
