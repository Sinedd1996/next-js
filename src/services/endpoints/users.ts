import { apiAxios } from "@/services/api";
import { FilterSearch } from "@/types/filter";
import { UserList } from "@/types/users";
import { getFilteredUsers } from "@/utils/filter-users";

export const getUsers = async (params: FilterSearch = {}) => {
  try {
    const { data } = await apiAxios.get<UserList>("/api/users", {
      params: { ...params },
    });
    const dataUsers = data?.data || [];

    if (params.search) {
      return getFilteredUsers(params.search, [...dataUsers]);
    }

    return dataUsers;
  } catch (error) {
    return Promise.reject(error);
  }
};
