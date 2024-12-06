// store allat in cookies
import Cookie from "js-cookie";

export function retriveCookie() {
  return JSON.parse(Cookie.get("surakku") || "{}");
}
/**
 * @private
 */
export function saveCookie(data: any) {
  Cookie.set("surakku", JSON.stringify(data));
}
interface StoreFunc {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
}
export function useStoreFunc(namespace: string): StoreFunc {
  return {
    get: (key: string) => {
      return (retriveCookie()[namespace] || {})[key];
    },
    set: (key: string, value: any) => {
      const cookie = retriveCookie();
      if (!cookie[namespace]) cookie[namespace] = {};
      cookie[namespace][key] = value;
      saveCookie(cookie);
    },
  };
}
