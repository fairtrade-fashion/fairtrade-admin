import secureLocalStorage from "react-secure-storage";

export const storeToken = (key: string, value: string) => {
  secureLocalStorage.setItem(key, value);
};
export const fetchToken = (key: string) => {
  return secureLocalStorage.getItem(key);
};

export const removeToken = (key: string) => {
  secureLocalStorage.removeItem(key);
};
