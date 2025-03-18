import Image from "next/image";

type SuccessProps = {
  text?: string;
  className?: string;
};

export function FormSuccess({ className = "", text }: SuccessProps) {
  return (
    <div className={`text-center ${className}`}>
      <Image
        className="mx-auto mb-[10px]"
        src="/success.svg"
        alt="success logo"
        width={120}
        height={120}
      />
      {text && <p className="text-[24px] font-bold mb-[10px]">{text}</p>}
    </div>
  );
}
