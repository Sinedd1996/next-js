import { Spinner } from "@/components";
import Image from "next/image";

type UserCardProps = {
  name: string;
  lastName: string;
  email: string;
  img?: string;
  onClickDelete?: () => void;
  // удаление карточек только если авторизован
  isAuth?: boolean;
  href?: string;
  isLoading?: boolean;
};

const hoverClasses = " hover:bg-gray-100";

export function UsersCard({
  name,
  email,
  img,
  lastName,
  onClickDelete,
  isAuth,
  href,
  isLoading = false,
}: UserCardProps) {
  const Component = href ? "a" : "div";

  return (
    <Component
      className={`text-center border rounded-md p-8 relative ${
        href ? hoverClasses : ""
      } ${isLoading ? "pointer-events-none" : ""}`}
      href={href}
    >
      <p className="text-[24px] font-bold">{name}</p>
      <p className="text-[24px] font-bold mb-[8px]">{lastName}</p>
      <p className="text-[18px] mb-[20px]">{email}</p>
      {img ? (
        <Image
          src={img}
          alt={name}
          width={100}
          height={100}
          priority={false}
          className="mx-auto rounded-full"
        />
      ) : (
        <div className="w-[100px] h-[100px] bg-gray-100 mx-auto rounded-full" />
      )}
      {isAuth && (
        <button
          className="absolute right-3 top-3 hover:text-red-500 bg-gray-500 rounded-full p-1 hover:bg-black focus:bg-black"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            if (onClickDelete) {
              onClickDelete();
            }
          }}
        >
          <Image src="/close.svg" alt="close icon" width={16} height={16} />
        </button>
      )}
      {isLoading && (
        <div className="absolute inset-px m-auto bg-white/50 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </Component>
  );
}
