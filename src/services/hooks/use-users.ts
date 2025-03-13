import useSWR from "swr";
import { SWR_KEY_USERS } from "@/consts";
import { getUsers } from "../endpoints/users";

export const useUsers = () => {
  const { data, error, isLoading } = useSWR(SWR_KEY_USERS, () => getUsers(), {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
};
