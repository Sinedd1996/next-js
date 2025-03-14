"use client";

import { Button, FormSuccess, Input, Modal } from "@/components";
import { errorMessage } from "@/consts";
import { apiAxios } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z
    .string({ message: errorMessage.required })
    .email({ message: errorMessage.email }),
  first_name: z.string().min(1, { message: errorMessage.required }),
  last_name: z.string().min(1, { message: errorMessage.required }),
});

type FormValues = z.infer<typeof schema>;

type ResponseApi = {
  name: string;
  job: string;
  id: number;
  createdAt: string;
};

interface ResponseUserCreate {
  data: ResponseApi;
}

export function UsersCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setError,
    clearErrors,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  useEffect(() => {
    // при закрытии модалки сбрасываем форму
    if (!isVisibleModal) {
      reset();
    }
  }, [isVisibleModal, reset]);

  const onSubmit = async ({ email, first_name, last_name }: FormValues) => {
    setIsLoading(true);

    try {
      const { data } = await apiAxios.post<FormValues, ResponseUserCreate>(
        "/api/users",
        {
          name: first_name + last_name,
          job: email,
        }
      );
      console.log(data);
      console.log({
        first_name,
        last_name,
        email,
      });
      // если успешно сработал запрос, сбрасываем форму
      reset();
    } catch (error) {
      let errorMessage = "Ошибка при создании пользователя";

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          errorMessage = "Ошибка: " + error.response?.data?.error;
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
    <div className="ml-auto">
      <Button
        text="Создать нового"
        additionalClassName="h-[48px]"
        onClick={() => setIsVisibleModal(true)}
      />
      {isVisibleModal && (
        <Modal isOpen={isVisibleModal} onClose={() => setIsVisibleModal(false)}>
          <div className="flex flex-col">
            <FormSuccess text="Пользователь успешно создан!" />
            <Button
              text="Закрыть форму"
              additionalClassName="mx-auto"
              onClick={() => setIsVisibleModal(false)}
            />
          </div>
          <h2 className="font-bold text-[24px] mb-[20px]">
            Новый пользователь
          </h2>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Controller
              control={control}
              name="first_name"
              render={({ field: { value, onChange, onBlur, ref } }) => (
                <div className="mb-[20px]">
                  <Input
                    id="first_name"
                    placeholder="Имя"
                    value={value}
                    onChange={(e) => {
                      if (errors?.root?.apiError?.message) {
                        clearErrors("root");
                      }
                      onChange(e.target.value);
                    }}
                    onBlur={onBlur}
                    ref={ref}
                    isError={Boolean(errors.first_name?.message)}
                    maxLength={50}
                  />
                  {errors.first_name && (
                    <p className="text-[12px] text-red-500">
                      {errors.first_name?.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="last_name"
              render={({ field: { value, onChange, onBlur, ref } }) => (
                <div className="mb-[20px]">
                  <Input
                    id="last_name"
                    placeholder="Фамилия"
                    value={value}
                    onChange={(e) => {
                      if (errors?.root?.apiError?.message) {
                        clearErrors("root");
                      }
                      onChange(e.target.value);
                    }}
                    onBlur={onBlur}
                    ref={ref}
                    isError={Boolean(errors.last_name?.message)}
                    maxLength={50}
                  />
                  {errors.last_name && (
                    <p className="text-[12px] text-red-500">
                      {errors.last_name?.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur, ref } }) => (
                <div className="mb-[32px]">
                  <Input
                    id="email"
                    placeholder="Почта"
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
            <Button text="Создать" disabled={!isValid || isLoading} />
          </form>
        </Modal>
      )}
    </div>
  );
}
