import { Input } from "@/components";

export default function Login() {
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="container">
      <h1>Войти</h1>
      <div className="flex">
        <form onSubmit={() => handleSubmit} noValidate>
          <div>
            <label htmlFor="password"></label>
            <Input id="password" />
          </div>
          <div>
            <label htmlFor="login"></label>
            <Input id="login" />
          </div>
        </form>
      </div>
    </div>
  );
}
