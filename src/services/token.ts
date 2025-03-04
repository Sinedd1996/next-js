import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY_NAME } from "@/consts";

export const getToken = (): string => {
  return Cookies.get(AUTH_TOKEN_KEY_NAME) || "";
};

export const deleteToken = (): void => {
  Cookies.remove(AUTH_TOKEN_KEY_NAME);
};

export function setToken(token: string) {
  Cookies.set(AUTH_TOKEN_KEY_NAME, token, { expires: 7 });
}
