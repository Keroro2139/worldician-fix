import { setCookie, removeCookies, getCookie } from "cookies-next";
import type { NextApiRequestCookies } from "next/dist/server/api-utils";

export class CookieUtil {
  static readonly ACCESS_TOKEN = "app:worldician:accesstoken";

  static isAuthenticated(cookies: { [key: string]: string }): boolean {
    return cookies[CookieUtil.ACCESS_TOKEN] !== undefined;
  }

  getAccessToken(cookies?: NextApiRequestCookies) {
    if (cookies) return cookies[CookieUtil.ACCESS_TOKEN];
    return getCookie(CookieUtil.ACCESS_TOKEN);
  }

  setAccessToken(accessToken: string) {
    setCookie(CookieUtil.ACCESS_TOKEN, accessToken);
  }

  removeAccessToken() {
    removeCookies(CookieUtil.ACCESS_TOKEN);
  }

  static toMap(cookie?: string): Map<string, string> {
    const cookieMap = new Map<string, string>();
    if (!cookie) return cookieMap;

    const items = cookie.split("; ");
    for (const item of items) {
      const sp = item.split("=");
      cookieMap.set(sp[0], sp[1]);
    }

    return cookieMap;
  }
}
