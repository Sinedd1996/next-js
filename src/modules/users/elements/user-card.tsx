import Image from "next/image";

type UserCardProps = {
  name: string;
  email: string;
  img?: string;
};

export function UserCard({ name, email, img }: UserCardProps) {
  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
      {img && (
        <Image src={img} alt={name} width={100} height={100} priority={false} />
      )}
    </div>
  );
}
