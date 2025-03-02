import { Button, Input } from "@/components";
import { apiAxios } from "@/services/api";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

interface ResponseLogin {
  token: string;
}

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      const { token } = await apiAxios.post<FormValues, ResponseLogin>(
        "/api/login",
        {
          email,
          password,
        }
      );

      if (!token) {
        throw new Error("Ошибка авторизации, нет токена");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-var(--header-height))] relative">
      <div className="flex w-full before:absolute before:bg-[url(/amsterdam.jpg)] before:bg-no-repeat before:w-[608px] before:h-full before:right-0 before:top-0 before:bg-cover before:border-l-4 before:border-blue-500">
        <div className="w-[calc(100%-608px)]">
          <h1 className="mb-[32px] text-[32px] font-bold pt-[18vh]">Войти</h1>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            noValidate
            className="max-w-[350px]"
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur, ref } }) => (
                <div className="mb-[32px]">
                  <Input
                    id="login"
                    placeholder="Логин"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                  />
                  {errors.email && <p>This is required.</p>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur, ref } }) => (
                <div className="mb-[32px]">
                  <Input
                    id="password"
                    placeholder="Пароль"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                  />
                  {errors.password && <p>This is required.</p>}
                </div>
              )}
            />
            <Button
              text="Отправить"
              additionalClassName="w-full min-h-[50px]"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
