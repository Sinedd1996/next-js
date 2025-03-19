import { LinkBack } from "@/components";
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
  let title = first_name || "";

  if (last_name) {
    title = title + " " + last_name;
  }

  return (
    <div className="container py-8">
      <LinkBack className="mb-[32px]" />
      <article>
        <h1 className="text-[24px] desktop:text-[40px] font-bold mb-[32px]">
          {title || "Пользователь"}
        </h1>
        <div className="tablet:flex gap-4 mb-[32px]">
          {avatar && (
            <Image
              src={avatar}
              alt={first_name || ""}
              width={120}
              height={120}
              priority={false}
              className="rounded-full mb-[32px] tablet:mb-0"
            />
          )}
          {email && (
            <p>
              Почта:<b className="block">{email}</b>
            </p>
          )}
        </div>
        <h2 className="text-[20px] dekstop:text-[32px] font-bold mb-[16px] desktop:mb-[32px]">Описание</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
          beatae rem dolore temporibus harum nemo eligendi eos enim officiis
          doloribus sequi quasi excepturi, sint sed. Dolor nam fugit incidunt
          quos?
        </p>
      </article>
    </div>
  );
}
