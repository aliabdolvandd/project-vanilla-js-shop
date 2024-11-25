import { data } from "autoprefixer";
import { getData } from "../api/getApi";
import { patchRequest } from "../api/patch";
import { postRequest } from "../api/post";
import { root } from "../router/index.routes";
import { detail } from "../screen/detailePage";
import { allProduct } from "../screen/home";
import { brands, filterHeader } from "../screen/home/brandFilter";
// import { wishList } from "../screen/wishList";

import { El } from "../script";
import { wishList } from "../screen/wishList";
import { categories } from "../screen/home/list";
import { cartPage } from "../screen/cart";
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
  const data = await getData("/users/" + getStorage("user").id);
  const wishProducts = data.wishlist;
  // console.log(products);
  const pageWislList = El({
    element: "div",
    children: [wishList(), allProduct(wishProducts)],
  });
  return pageWislList;
};
// export const renderProductWish = async () => {
//   const productWish = await getData(`/users/${data.wishlist}`);
//   console.log(productWish);
//   return allProduct(productWish);
// };
export const renderCategoryItems = async (brand = "all") => {
  // const brand = params.brand;

  const data =
    brand === "all"
      ? await getData(`/Products`)
      : await getData(`/Products?brand=${brand}`);
  const categoryContainer = El({
    element: "div",
    children: [allProduct(data)],
  });
  // console.log(data);
  return categoryContainer;
};
export const renderCartPage = async () => {
  const data = await getData("/users/" + getStorage("user").id);
  const cartProduct = data.cart || [];
  // console.log(cartProduct);

  return cartPage(cartProduct);
};
