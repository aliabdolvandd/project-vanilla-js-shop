import { getData } from "../api/getApi";
import { patchRequest } from "../api/patch";
import { postRequest } from "../api/post";
import { root } from "../router/index.routes";
import { detail } from "../screen/detailePage";
import { allProduct } from "../screen/home";
import { filterHeader } from "../screen/home/brandFilter";
import { wishList } from "../screen/wishList";

import { El } from "../script";

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

export const renderProductFilter = async (params) => {
  const brand = params.data.brand;
  const data = await getData(`/Products?brand=${brand}`);

  const wrapper = El({
    element: "div",
    children: [filterHeader(brand), allProduct(data)],
  });
  return wrapper;
};

export const renderDetaile = async (params) => {
  const data = await getData(`/Products/${params.data.id}`);
  // console.log(params);
  return detail(data);
};

export const renderWishList = async () => {
  const data = await getData("/users/" + getStorage("user")).id;
  // const products = data.wishList;
  // console.log(products);
  return wishList(data);
};
