import Image from "next/image";

type UserCardProps = {
  name: string;
  lastName: string;
  email: string;
  img?: string;
  onClickDelete?: () => void;
};

export function UsersCard({
  name,
  email,
  img,
  lastName,
  onClickDelete,
}: UserCardProps) {
  return (
    <div className="text-center border rounded-md p-8 relative">
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
        <div className="w-[100px] h-[100px] bg-gray-100 mx-auto rounded-full"></div>
      )}
      <button
        className="absolute right-3 top-3 hover:text-red-500"
        onClick={onClickDelete}
      >
        <svg
          className="w-[24px] h-[24px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
