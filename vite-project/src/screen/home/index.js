import { data } from "autoprefixer";
import { getData } from "../../api/getApi";
import { El } from "../../script";
import { svgs } from "../../svgs";
// import { renderCategori, renderProduct } from "../../utils/render";
import { mostPopular } from "./popular";
import { categories } from "./list";
import { brandFilter, filterHeader } from "./brandFilter";
import { router } from "../../router/index.routes";
import { wishList } from "../wishList";
import { renderCategoryItems } from "../../utils/render";
import { search } from "../serchBox";

// const isWishList = false;
// Header In HOME
export const header = function (data) {
  return El({
    element: "div",
    className: "flex items-center justify-between px-4 py-2",
    children: [
      El({
        element: "div",
        className: "flex items-center gap-3",
        children: [
          El({
            element: "img",
            className: "w-10 h-10 rounded-full",
            restAttrs: { src: "/images/profile.png" },
          }),
          El({
            element: "div",
            className: "flex flex-col",
            children: [
              El({
                element: "p",
                className: "text-gray-500",
                innerText: "wellcome 👋",
              }),
              El({
                element: "span",
                className: "font-bold",
                innerText: "aliabd",
              }),
            ],
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex gap-5",
        children: [
          El({
            element: "span",
            className: "w-full h-full",
            innerHTML: svgs.Like,
            eventListener: [
              {
                event: "click",
                callback: () => router.navigate(`/wishlist`),
              },
            ],
          }),
          El({
            element: "span",
            className: "w-full h-full",
            innerHTML: svgs.Notif,
          }),
        ],
      }),
    ],
  });
};
//Show Products
export const allProduct = (data) => {
  const allProducts = El({
    element: "div",
    className:
      "flex justify-between items-center flex-wrap gap-4 p-[24px] pb-24",
    children: data.map((product) => {
      return El({
        element: "div",
        className: "w-48 h-48  overflow-hidden  flex flex-col",
        children: [
          El({
            element: "img",
            className: "w-full h-32 object-cover rounded-xl",
            restAttrs: { src: product.images, alt: product.title },
          }),
          El({
            element: "span",
            className: "text-left text-xl font-bold mt-2 ml-3",
            textContent: product.title,
          }),
          El({
            element: "span",
            className: "text-left text-[#152536] text-lg ml-3 font-semibold",
            textContent: `${product.price}$`,
          }),
        ],
        eventListener: [
          {
            event: "click",
            callback: () => {
              router.navigate(`/product/${product.id}`);
            },
          },
        ],
      });
    }),
  });
  return allProducts;
};
// Render Home Page
export const home = async () => {
  return El({
    element: "div",
    className: "flex-1 justify-center items-center",
    children: [
      header(),
      search(),
      brandFilter(),

      mostPopular(),
      // await renderProduct(),
      categories(),
      // await renderCategori(),
      El({
        element: "div",
        id: "productList",
        children: [await renderCategoryItems()],
      }),
    ],
  });
};
