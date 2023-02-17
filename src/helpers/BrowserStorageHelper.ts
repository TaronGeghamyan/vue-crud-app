class BrowserStorageHelper {
  static localStorage = window.localStorage;
  static sessionStorage = window.sessionStorage;
  static indexDB: IDBFactory | null =
    window.indexedDB ||
    (window as any).mozIndexedDB ||
    (window as any).webkitIndexedDB ||
    (window as any).msIndexedDB;

  static setToLocalStorage(key: string, value: string) {
    this.localStorage.setItem(key, value);
  }

  static getFromLocalStorage(key: string) {
    return this.localStorage.getItem(key);
  }

  static removeFromLocalStorage(key: string) {
    this.localStorage.removeItem(key);
  }

  static clearLocalStorage() {
    this.localStorage.clear();
  }

  static setToSessionStorage(key: string, value: string) {
    this.sessionStorage.setItem(key, value);
  }

  static getFromSessionStorage(key: string) {
    return this.sessionStorage.getItem(key);
  }

  static removeFromSessionStorage(key: string) {
    this.sessionStorage.removeItem(key);
  }

  static clearSessionStorage() {
    this.sessionStorage.clear();
  }

  static setCookie(key: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${key}=${value};${expires};path=/`;
  }

  static getCookie(key: string) {
    const keyValue = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
    return keyValue ? keyValue[2] : null;
  }

  static removeCookie(key: string) {
    this.setCookie(key, "", -1);
  }
}
