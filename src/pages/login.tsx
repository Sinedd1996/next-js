"use client";

import { Button, Input } from "@/components";
import { AppRouterPages, errorMessage } from "@/consts";
import { useAuth } from "@/hooks/use-auth";
import { apiAxios } from "@/services/api";
import { setToken } from "@/services/token";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
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
  token: string;
};
interface ResponseLogin {
  data: ResponseToken;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuth } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    setIsLoading(true);

    try {
      const { data } = await apiAxios.post<FormValues, ResponseLogin>(
        "/api/login",
        {
          email,
          password,
        }
      );

      if (!data?.token) {
        throw new Error("Ошибка авторизации, нет токена.");
      }

      // записываем токен в куки
      setToken(data?.token);
      // в приложении меняем состояние авторизации
      setIsAuth(true);
      router.push(AppRouterPages.Profile);
    } catch (error) {
      let errorMessage = "Ошибка авторизации";

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          errorMessage = "Ошибка авторизации: " + error.response?.data?.error;
        }
      }

      setError("root.apiError", {
        type: "apiError",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Логин</title>
      </Head>
      <div className="container flex min-h-[calc(100vh-var(--header-height))] relative">
        <div className="flex w-full desktop:before:absolute desktop:before:bg-[url(/amsterdam.jpg)] desktop:before:bg-no-repeat desktop:before:w-[608px] desktop:before:h-full desktop:before:right-[40px] desktop:before:top-0 desktop:before:bg-cover desktop:before:border-l-4 desktop:before:border-blue-500">
          <div className="w-full desktop:w-[calc(100%-608px)] py-[10vh] desktop:py-[18vh]">
            <h1 className="mb-[32px] text-[32px] font-bold">Войти</h1>
            <form
              onSubmit={handleSubmit((data) => onSubmit(data))}
              noValidate
              className="desktop:max-w-[350px]"
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
                      onChange={(e) => {
                        if (errors?.root?.apiError?.message) {
                          clearErrors("root");
                        }
                        onChange(e.target.value);
                      }}
                      onBlur={onBlur}
                      ref={ref}
                      isError={Boolean(errors.email?.message)}
                      maxLength={100}
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
                      onChange={(e) => {
                        if (errors?.root?.apiError?.message) {
                          clearErrors("root");
                        }
                        onChange(e.target.value);
                      }}
                      onBlur={onBlur}
                      ref={ref}
                      isError={Boolean(errors.password?.message)}
                      maxLength={100}
                    />
                    {errors.password && (
                      <p className="text-[12px] text-red-500">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              {errors?.root?.apiError?.message && (
                <p className="text-[12px] text-red-500 mb-[32px]">
                  {errors.root.apiError.message}
                </p>
              )}
              <Button
                text="Отправить"
                disabled={isLoading}
                className="w-full min-h-[50px]"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
