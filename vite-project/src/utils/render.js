import { getData } from "../api/getApi";
import { root } from "../router/index.routes";
import { allProduct } from "../screen/home";

export const render = function (...children) {
  root.innerHTML = "";

  root.append(...children);
};

export const setStorage = function (name, value) {
  localStorage.setItem(name, JSON.stringify(value));
};
export const getStorage = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

export const renderProduct = async () => {
  const data = await getData("/Products");

  return allProduct(data);
};
