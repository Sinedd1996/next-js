import { SetStateAction, Dispatch, PropsWithChildren } from "react";

export type AuthContextType = {
  isAuth: boolean | undefined;
  setIsAuth: Dispatch<SetStateAction<boolean | undefined>>;
}

export type AuthContextProviderProps = {
  isAuthProp?: boolean;
} & PropsWithChildren
