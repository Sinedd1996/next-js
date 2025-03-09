type ButtonProps = {
  as?: "button" | "a";
  href?: string;
  text: string;
  theme?: "blue" | "gray";
  // на случай если нужно будет добавить дополнительные классы
  additionalClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const baseClasses = "px-4 py-2 rounded-full font-bold text-[16px] disabled:opacity-50 disabled:pointer-events-none";
const themeBlue = "bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-600";
const themeGray = "bg-gray-500 text-white hover:bg-gray-700 active:bg-gray-600";

export function Button({
  as = "button",
  href,
  text,
  theme = "blue",
  additionalClassName,
  ...props
}: ButtonProps) {
  const Component = as;
  let themeClasses = themeBlue;

  if (theme === 'gray') {
    themeClasses = themeGray;
  }

  return (
    <Component
      href={as === "a" ? href : undefined}
      {...props}
      onClick={props.onClick}
      className={`${baseClasses} ${themeClasses} ${additionalClassName}`}
    >
      {text}
    </Component>
  );
}
