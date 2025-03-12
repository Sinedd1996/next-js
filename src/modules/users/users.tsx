import { SWR_KEY_USERS } from "@/consts";
import { fetcherSwr } from "@/services/api";
import useSWR from "swr";
import { UserCard } from "./elements/user-card";
import { UserList } from "@/types/users";

export function Users() {
  const { data } = useSWR<UserList>(SWR_KEY_USERS, fetcherSwr);
  const cardList = data?.data || [];

  return (
    <div className="container">
      {cardList.map(({ id, first_name, email, avatar }) => (
        <UserCard key={id} name={first_name} email={email} img={avatar} />
      ))}
    </div>
  );
}
