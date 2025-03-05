import { Button, Input } from "@/components";
import { errorMessage } from "@/consts";
import { apiAxios } from "@/services/api";
import { setToken } from "@/services/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z
    .string({ message: errorMessage.required })
    .email({ message: errorMessage.email }),
  password: z
    .string({ message: errorMessage.required })
    .min(8, { message: errorMessage.password }),
});

type FormValues = z.infer<typeof schema>;

type ResponseToken = {
  token: string
}
interface ResponseLogin {
  data: ResponseToken
}

export default function Login() {
  'use client'
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      const { data } = await apiAxios.post<FormValues, ResponseLogin>(
        "/api/login",
        {
          email,
          password,
        }
      );

      console.log(data, ' === data')

      if (!data?.token) {
        throw new Error("Ошибка авторизации, нет токена");
      }

      setToken(data?.token);
      
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
              render={({ field: { value, onChange, onBlur, ref } }) => (
                <div className="mb-[32px]">
                  <Input
                    id="login"
                    placeholder="Логин"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    error={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <p className="text-[12px] text-red-500">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur, ref } }) => (
                <div className="mb-[32px]">
                  <Input
                    id="password"
                    placeholder="Пароль"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    error={Boolean(errors.password)}
                  />
                  {errors.password && (
                    <p className="text-[12px] text-red-500">
                      {errors.password?.message}
                    </p>
                  )}
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
