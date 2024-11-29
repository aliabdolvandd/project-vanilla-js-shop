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
import { createFooter } from "../layout/footer";
import { mostPopular, showPopular } from "../screen/home/popular";
// import { searchPage } from "../screen/serchBox";

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
export const renderPopular = async (params, brandName = "", selected) => {
  const data = await getData(`/Products?popular=true&brand=${brandName}`);
  const product = data;
  if (product) {
    const pagePopular = El({
      element: "div",
      className: "flex flex-col gap-4",
      children: [showPopular(), categories(selected), allProduct(product)],
    });
    return pagePopular;
  }
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
  const pageWishList = El({
    element: "div",
    children: [wishList(), allProduct(wishProducts)],
  });
  return pageWishList;
};

export const renderCategoryItems = async (brand = "all") => {
  const data =
    brand === "all"
      ? await getData(`/Products`)
      : await getData(`/Products?brand=${brand}`);
  const categoryContainer = El({
    element: "div",
    children: [allProduct(data)],
  });

  return categoryContainer;
};
export const renderCartPage = async () => {
  const data = await getData("/users/" + getStorage("user").id || "");

  const cartProduct = data.cart || [];
  // console.log(cartProduct);

  return cartPage(cartProduct);
};

// export const renderCheckoutPage = async () => {
//   const userId = getStorage("user").id;
//   const userData = await getData(`/users/${userId}`);
//   const cart = userData.cart || [];

//   // const cartProduct = data.cart || [];
//   const checkoutPage = El({
//     element: "div",
//     children: [productCheckout(cart)],
//   });
//   return checkoutPage;
// };

export const reRender = function (...children) {
  root.innerHTML = "";
  const footerEl = El({
    element: "footer",
    className: "fixed bottom-0 left-0 w-full",
    children: [createFooter()],
  });
  root.append(...children, footerEl);
};
