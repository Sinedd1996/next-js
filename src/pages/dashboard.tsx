import { Button } from "@/components";

export default function Dashboard() {
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div>
      <p>Dashboard PAGE</p>
      <Button as='button' text="Выйти" onClick={() => handleLogout} />
    </div>
  );
}
