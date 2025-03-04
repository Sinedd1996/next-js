import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY_NAME } from "@/consts";
import { cookies } from 'next/headers'

export const getToken = async (): Promise<string> => {
  const cookiesApp = await cookies();
  return cookiesApp.get(AUTH_TOKEN_KEY_NAME)?.value || "";
};

export const deleteToken = (): void => {
  Cookies.remove(AUTH_TOKEN_KEY_NAME);
};

export function setToken(token: string) {
  Cookies.set(AUTH_TOKEN_KEY_NAME, token, { expires: 7 });
}
