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
    className: "flex justify-between items-center px-4 py-2 bg-white shadow",
    children: [
      El({
        element: "input",
        className: "flex-1 px-4 py-2 rounded-full border border-gray-300",
        restAttrs: {
          type: "text",
          placeholder: "Search",
        },
      }),

      El({
        element: "div",
        className: "flex items-center gap-4",
        children: [
          El({
            element: "button",
            innerHTML: svgs.Grid,
          }),
          El({
            element: "button",
            innerHTML: svgs.More,
          }),
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

const wishProduct = (products) => {
  return El({
    element: "div",
    className: "grid grid-cols-2 gap-4 p-4 bg-white",
    children: products.map((product) =>
      El({
        element: "div",
        className:
          "relative flex flex-col items-center bg-white p-4 rounded-lg shadow-sm",
        children: [
          El({
            element: "button",
            className:
              "absolute top-2 right-2 bg-white rounded-full p-2 shadow",
            innerHTML: svgs.Heart,
          }),

          El({
            element: "img",
            className: "w-full h-40 object-contain mb-2",
            restAttrs: {
              src: product.image,
              alt: product.title,
            },
          }),

          El({
            element: "h3",
            className: "text-lg font-semibold text-gray-800",
            textContent: product.title,
          }),

          El({
            element: "div",
            className: "flex justify-between items-center w-full mt-2",
            children: [
              El({
                element: "span",
                className: "flex items-center text-sm text-gray-600",
                innerHTML: `${svgs.Star} ${product.rating}`,
              }),
              El({
                element: "span",
                className: "text-sm text-gray-600",
                textContent: `${product.sold} sold`,
              }),
            ],
          }),

          El({
            element: "span",
            className: "text-lg font-bold text-gray-800 mt-2",
            textContent: `$${product.price}`,
          }),
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
