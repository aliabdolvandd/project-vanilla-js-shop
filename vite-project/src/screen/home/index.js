import { El } from "../../script";
import { svgs } from "../../svgs";

export const header = function () {
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

const search = () => {
  return El({
    element: "div",
    className:
      "flex items-center px-4 py-2 bg-gray-100 shadow-sm w-96 ml-4 mt-2 max-w-sm",
    children: [
      El({
        element: "span",
        className: "w-5 h-5 text-gray-400 mr-2",
        innerHTML: svgs.search,
      }),
      El({
        element: "input",
        className:
          "flex-grow bg-gray-100 border-none focus:outline-none text-gray-700 text-sm placeholder-gray-400",
        restAttrs: { type: "text", placeholder: "Search" },
      }),
    ],
  });
};
const brands = [
  { logo: "/images/nike.png", name: "Nike" },
  { logo: "/images/adidas.png", name: "Adidas" },
  { logo: "/images/puma.png", name: "Puma" },
  { logo: "/images/asics.png", name: "Asics" },
  { logo: "/images/reebok.png", name: "Reebok" },
  { logo: "/images/newb.png", name: "New Balance" },
  { logo: "/images/convers.png", name: "Converse" },
  { logo: "/images/more.png", name: "More .." },
];

const brandFilter = function () {
  return El({
    element: "div",
    className: "grid grid-cols-4 gap-4 p-4 bg-white",
    children: brands.map((brand) =>
      El({
        element: "div",
        className: "flex flex-col items-center",
        children: [
          El({
            element: "div",
            className:
              "w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full",
            children: [
              El({
                element: "img",
                className: "w-8 h-8 object-contain",
                restAttrs: {
                  src: brand.logo,
                  alt: `${brand.name} Logo`,
                },
              }),
            ],
          }),

          El({
            element: "span",
            className: "text-[14px] font-bold text-gray-700 mt-2 text-center",
            textContent: brand.name,
          }),
        ],
      })
    ),
  });
};


const allProduct = ()=> {
  return El({
    element:"div",
    className:
  })
}


export const home = () => {
  return El({
    element: "div",
    className: "flex-1",
    children: [header(), search(), brandFilter()],
  });
};
