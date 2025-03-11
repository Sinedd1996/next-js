import { SetStateAction, Dispatch, PropsWithChildren } from "react";

export interface AuthContextType {
  isAuth: boolean | undefined;
  setIsAuth: Dispatch<SetStateAction<boolean | undefined>>;
}

export interface AuthContextProviderProps extends PropsWithChildren {
  isAuthProp?: boolean;
}
