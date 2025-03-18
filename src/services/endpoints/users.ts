import { apiAxios } from "@/services/api";
import { FilterSearch } from "@/types/filter";
import { UserDetail, UserList } from "@/types/users";
import { getFilteredUsers } from "@/utils/filter-users";

// список юзеров
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

// детальная ифнормация юзера
export const getUserDetail = async ({ id }: { id: string }) => {
  try {
    const { data } = await apiAxios.get<UserDetail>(`/api/users/${id}`);
    return data.data || {};
  } catch (error) {
    return Promise.reject(error);
  }
};

// удаление юзера
export const deleteUser = async ({ id }: { id: string }) => {
  try {
    await apiAxios.delete(`/api/users/${id}`);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
