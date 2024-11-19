import { El } from "../../script";
import { getData } from "../../api/getApi";
import { renderProduct } from "../../utils/render";

export const mostPopular = () => {
  return El({
    element: "div",
    className: "flex justify-between items-center mb-4 w-[410px] ml-6",
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
            callback: () => router.navigate("/all-products"),
          },
        ],
      }),
    ],
  });
};
