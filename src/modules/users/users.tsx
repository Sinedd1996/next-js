import { fetcherSwr } from "@/services/api";
import useSWR from "swr";

export function Users() {
  const { data } = useSWR("/api/users", fetcherSwr);
  return (
    <div className="container">
      <h1>PAGE USERS</h1> {data.per_page}
    </div>
  );
}
