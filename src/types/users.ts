export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UserList = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

export type UserCreateData = Pick<User, "first_name" | "last_name" | "email">;
