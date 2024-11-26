import { El } from "../../script";
import { getData } from "../../api/getApi";
import { renderProduct } from "../../utils/render";
import { router } from "../../router/index.routes";
import { allProduct } from ".";
import { data } from "autoprefixer";
import { svgs } from "../../svgs";
export const mostPopular = () => {
  return El({
    element: "div",
    className: "flex justify-between items-center mb-4 w-[390px] ml-6",
    children: [
      El({
        element: "h2",
        className: "text-2xl font-bold text-[#152536]",
        textContent: "Most Popular",
      }),
      El({
        element: "button",
        className: "text-[#152536] text-[16px] font-semibold",
        textContent: "See All",
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/popular"),
          },
        ],
      }),
    ],
  });
};
//Header Most Popular
const headerPopular = function () {
  return El({
    element: "div",
    className: "flex gap-4 items-center px-4 py-2",
    children: [
      El({
        element: "span",
        innerHTML: svgs.Back,
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/"),
          },
        ],
      }),
      El({
        element: "span",
        className: "text-2xl font-bold",
        innerText: "Most Popular",
      }),
    ],
  });
};
export const showPopular = function () {
  return El({
    element: "div",
    className: "flex flex-col",
    children: [headerPopular()],
  });
};
