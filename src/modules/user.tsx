import { SWR_KEY_USERS } from "@/consts";
import { getUserDetail } from "@/services/endpoints/users";
import Image from "next/image";
import useSWR from "swr";

type UserProps = {
  slug: string;
};

export function User({ slug }: UserProps) {
  const swrKey = `${SWR_KEY_USERS}/${slug}`;

  const { data } = useSWR(swrKey, () => getUserDetail({ id: slug }), {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  const { first_name, last_name, email, avatar } = data || {};

  return (
    <div className="container py-8">
      <h1 className="text-[40px] font-bold mb-[32px]">
        Информация о пользователе
      </h1>
      {avatar && (
        <Image
          src={avatar}
          alt={first_name || ""}
          width={100}
          height={100}
          priority={false}
        />
      )}
      {first_name && <p>Имя: {first_name}</p>}
      {last_name && <p>Фамилия: {last_name}</p>}
      {email && <p>Почта: {email}</p>}
    </div>
  );
}
