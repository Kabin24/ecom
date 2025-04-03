import { toast } from "react-toastify";

export enum NotifyType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export const notify = (msg: string, type: NotifyType) => {
  if (type === "success") {
    toast.success(msg);
  } else if (type === "error") {
    toast.error(msg);
  } else if (type === "warning") {
    toast.warning(msg);
  } else if (type === "info") {
    toast.info(msg);
  } else {
    toast(msg);
  }
};

export const setCookie = (name: string, value: string, exdays: number) => {
  document.cookie = `${name}=${value}; expries=${new Date(
    Date.now() + exdays * 86400000
  )}`;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie;
  let data: string = "";

  if (cookies) {
    const cookiesValue = cookies.split(";");

    cookiesValue.map((cookie) => {
      const [key, value] = cookie.split("=");
      if (key === name) {
        data = value;
      }
    });
  }
  return data;
};

//local storage , session storage

export const setLocalStorage = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

export const getFromLocalstorage = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const removeFromLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};

export const flushLocalStorage = () => {
  localStorage.clean();
};
export const setSessionStorage = (name: string, value: string) => {
  sessionStorage.setItem(name, value);
};

export const getFromSessionStorage = (name: string) => {
  sessionStorage.getItem(name);
};

export const removeFromSessionStorage = (name: string) => {
  sessionStorage.removeItem(name);
};

export const flushSessionStorage = () => {
  sessionStorage.clean();
};
