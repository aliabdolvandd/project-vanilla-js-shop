import { router } from "../../router/index.routes";
import { El } from "../../script";
import { svgs } from "../../svgs";
import { render } from "../../utils/render";
// Footer Detail
const footerItems = [
  {
    icon: svgs.Home,
    text: "Home",
    path: "/",
  },
  {
    icon: svgs.Cart,
    text: "Cart",
    path: "/cart",
  },
  {
    icon: svgs.Order,
    text: "Order",
    path: "/order",
  },
  {
    icon: svgs.Wallet,
    text: "Wallet",
    path: "/wallet",
  },
  {
    icon: svgs.profile,
    text: "Profile",
    path: "/profile",
  },
];

export function createFooter() {
  const footer = El({
    element: "div",
    className: "flex justify-around items-center py-4 bg-white shadow-md ",
    children: footerItems.map((item) =>
      El({
        element: "div",
        className:
          "flex flex-col items-center justify-center text-gray-700 gap-1",
        eventListener: [
          {
            event: "click",
            callback: (e) => {
              router.navigate(item.path);
            },
          },
        ],
        children: [
          El({
            element: "span",
            className: "w-full h-full ml-3",
            innerHTML: item.icon,
          }),
          El({
            element: "span",
            className: "text-[10px] font-bold",
            textContent: item.text,
          }),
        ],
      })
    ),
  });

  return footer;
}
