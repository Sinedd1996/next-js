import AuthContext from "@/context/authContext";
import { useContext } from "react";

export default function Home() {
  const { setIsAuth } = useContext(AuthContext);

  setIsAuth(true)
  return <div>Main PAGE</div>;
}
