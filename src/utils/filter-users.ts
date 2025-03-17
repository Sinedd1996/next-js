import { User } from "@/types/users";

type UserKeys = keyof User;

export const getFilteredUsers = (
  searchValue: string,
  // список объектов
  list: User[] = [],
  // ключи по которым будем фильтровать
  searchKeys: UserKeys[] = ["first_name", "last_name", "email"]
) => {
  const filtered = list.filter((item) =>
    searchKeys.some((keyValue) => {
      const currentKeyValue = String(item[keyValue]).toLowerCase();

      return currentKeyValue.includes(searchValue.toLowerCase());
    })
  );

  return filtered || [];
};

export const getSwrKeyByQueryParams = (
  params: Record<string, unknown>,
) => {
  let keyString = ''

  for (const item in params) {
    keyString = keyString + `${item}=${params[item]}/`
  }
  
  return keyString;
};
