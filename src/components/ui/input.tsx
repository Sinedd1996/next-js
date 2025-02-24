import { InputHTMLAttributes } from "react";

type inputProps = {
  isError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input(props: inputProps) {
  return (
    <input {...props} placeholder={props.name} />
  );
}
