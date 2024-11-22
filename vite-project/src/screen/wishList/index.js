import { El } from "../../script";
import { svgs } from "../../svgs";

const categories = [
  { name: "All", isActive: true },
  { name: "Nike", isActive: false },
  { name: "Adidas", isActive: false },
];

export const wishHeader = () => {
  return El({
    element: "div",
    className: "flex justify-between items-center px-4 py-2 ",
    children: [
      El({
        element: "span",
        className: "",
        innerHTML: svgs.Back,
        eventListener: [
          {
            event: "click",
            callback: () => history.back(),
          },
        ],
      }),
      El({
        element: "h2",
        className: "flex-1 px-4 py-2 font-bold text-2xl relative",
        textContent: "My Wishlist",
      }),

      El({
        element: "div",
        className: "flex items-center gap-4 absolute right-6 -translate-y-1",
        children: [
          El({
            element: "span",
            className: "",
            innerHTML: svgs.search,
          }),
          // El({
          //   element: "button",
          //   innerHTML: svgs.More,
          // }),
        ],
      }),
    ],
  });
};

const wishCategories = () => {
  return El({
    element: "div",
    className: "flex items-center overflow-x-auto gap-4 p-4",
    children: categories.map((category) =>
      El({
        element: "button",
        className: `px-4 py-2 rounded-full ${
          category.isActive
            ? "bg-gray-900 text-white"
            : "bg-gray-200 text-gray-900"
        }`,
        textContent: category.name,
        eventListener: [
          {
            event: "click",
            callback: () => {
              console.log(`Selected category: ${category.name}`);
            },
          },
        ],
      })
    ),
  });
};

export const wishList = function () {
  return El({
    element: "div",
    className: "flex-1",
    children: [wishHeader(), wishCategories()],
  });
};
