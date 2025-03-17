import { apiAxios } from "@/services/api";
import { FilterSearch } from "@/types/filter";
import { UserList } from "@/types/users";

export const getUsers = async (params: FilterSearch = {}) => {
  try {
    const { data } = await apiAxios.get<UserList>("/api/users", {
      params: {...params}
    });
    return data?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};
