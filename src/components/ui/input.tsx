import { forwardRef, InputHTMLAttributes } from "react";

type inputProps = {
  isError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, inputProps>(
  ({ ...props }, ref) => {
    const erorrClass = props.isError ? "border-red-500" : "";

    return (
      <input
        ref={ref}
        {...props}
        placeholder={props.placeholder}
        className={`h-[48px] w-full border border-gray-500 rounded-md px-[16px] ${erorrClass}`}
      />
    );
  }
);

Input.displayName = "Input";
