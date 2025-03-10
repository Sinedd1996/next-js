import { forwardRef, InputHTMLAttributes } from "react";

type inputProps = {
  isError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, inputProps>(
  ({ isError, ...props }, ref) => {
    const erorrClass = isError ? "border-red-500" : "";

    return (
      <input
        ref={ref}
        placeholder={props.placeholder}
        className={`h-[48px] w-full border border-gray-500 rounded-md px-[16px] ${erorrClass}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
