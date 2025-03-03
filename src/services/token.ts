const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export type Token = string;

export const getToket = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  return token ?? '';
};

// export const dropToken = (): void => {
//   localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
// };

import cookie from "cookie";

export async function setToken(token: string) {
  console.log('SET TOKEN WORK')
  cookie.serialize("at", token, {
    httpOnly: true,
    // 1 неделя
    maxAge: 60 * 60 * 24 * 7,
  });
}
