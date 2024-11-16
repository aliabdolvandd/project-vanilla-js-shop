import { El } from "../../script";
import { svgs } from "../../svgs";
import { render } from "../../utils/render";

const footerItems = [
  {
    icon: svgs.Home,
    text: "Home",
  },
  {
    icon: svgs.Cart,
    text: "Cart",
  },
  {
    icon: svgs.Order,
    text: "Order",
  },
  {
    icon: svgs.Wallet,
    text: "Wallet",
  },
  {
    icon: svgs.profile,
    text: "Profile",
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
            callback: (E) => {
              console.log(item.text);
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

// export const footer = () => {
//   return El({
//     element: "div",
//     className:
//       "flex justify-around items-center py-4 bg-white shadow-md border-t h-auto",
//     children: [
//       El({
//         element: "div",
//         className:
//           "flex flex-col items-center justify-center text-gray-700 gap-1",
//         children: [
//           El({
//             element: "span",
//             className: "w-full h-full",
//             innerHTML: svgs.Home,
//           }),
//           El({
//             element: "span",
//             className: "text-[10px] w-full h-full",
//             innerText: "Home",
//           }),
//         ],
//       }),
//       El({
//         element: "div",
//         className: "flex flex-col items-center text-gray-700",
//         children: [
//           El({
//             element: "span",
//             className: "w-5 h-5",
//             innerHTML: svgs.Cart,
//           }),
//           El({
//             element: "span",
//             className: "text-sm mt-1",
//             innerText: "Cart",
//           }),
//         ],
//       }),
//       El({
//         element: "div",
//         className: "flex flex-col items-center text-gray-700",
//         children: [
//           El({
//             element: "span",
//             className: "w-5 h-5",
//             innerHTML: svgs.Order,
//           }),
//           El({
//             element: "span",
//             className: "text-sm mt-1",
//             innerText: "Order",
//           }),
//         ],
//       }),
//       El({
//         element: "div",
//         className: "flex flex-col items-center text-gray-700",
//         children: [
//           El({
//             element: "span",
//             className: "w-5 h-5",
//             innerHTML: svgs.Wallet,
//           }),
//           El({
//             element: "span",
//             className: "text-sm mt-1",
//             innerText: "Wallet",
//           }),
//         ],
//       }),
//       El({
//         element: "div",
//         className: "flex flex-col items-center text-gray-700",
//         children: [
//           El({
//             element: "span",
//             className: "w-5 h-5",
//             innerHTML: svgs.profile,
//           }),
//           El({
//             element: "span",
//             className: "text-sm mt-1",
//             innerText: "Profile",
//           }),
//         ],
//       }),
//     ],
//   });
// };
