import { useRouter } from "next/router";

export function LinkBack({ ...props }: HTMLAnchorElement) {
  const router = useRouter();

  return (
    <a
      className={`inline-flex items-center gap-2 hover:text-blue-600 text-[14px] ${props.className || ''}`}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
    >
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.75 2.5L5.25 8L10.75 13.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Вернуться назад
    </a>
  );
}
