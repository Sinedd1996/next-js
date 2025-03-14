import Image from "next/image";

type SuccessProps = {
  text?: string;
  additionalClassName?: string;
};

export function FormSuccess({ additionalClassName = "", text }: SuccessProps) {
  return (
    <div className={`text-center ${additionalClassName}`}>
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
