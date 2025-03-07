export function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  const cookieArray = cookieString.split('; ');

  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');

    if (key && value) {
      cookies[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });

  return cookies;
}
