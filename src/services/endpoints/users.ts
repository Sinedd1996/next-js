import { apiAxios } from "@/services/api";
import { UserList } from "@/types/users";

export const getUsers = async () => {
  try {
    const { data } = await apiAxios.get<UserList>("/api/users", {});
    return data?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};
