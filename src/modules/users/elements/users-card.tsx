import Image from "next/image";

type UserCardProps = {
  name: string;
  email: string;
  img?: string;
};

export function UsersCard({ name, email, img }: UserCardProps) {
  return (
    <div className="text-center border rounded-md p-8">
      <p className="text-[24px] font-bold mb-[8px]">{name}</p>
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
    </div>
  );
}
