type ButtonProps = {
  as?: "button" | "a";
  href?: string;
  text: string;
  theme?: "blue" | "gray";
};

const baseClasses = "px-4 py-2 rounded-full font-bold ";

export function Button({
  as = "button",
  href,
  text,
  theme = "blue",
  ...props
}: ButtonProps) {
  const Component = as;
  const themeClasses = `bg-${theme}-500 text-white hover:bg-${theme}-700 active:bg-${theme}-600`;

  return (
    <Component
      href={as === "a" ? href : undefined}
      {...props}
      className={`${baseClasses} ${themeClasses}`}
    >
      {text}
    </Component>
  );
}
