import { El } from "../../script";
import { router } from "../../router/index.routes";
import { renderProduct, renderProductFilter } from "../../utils/render";

const brands = [
  { logo: "/images/nike.png", name: "nike" },
  { logo: "/images/adidas.png", name: "adidas" },
  { logo: "/images/puma.png", name: "puma" },
  { logo: "/images/asics.png", name: "asics" },
  { logo: "/images/reebok.png", name: "reebok" },
  { logo: "/images/newb.png", name: "newbalance" },
  { logo: "/images/convers.png", name: "converse" },
  { logo: "/images/more.png", name: "More .." },
];

export const brandFilter = function () {
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
        eventListener: [
          {
            event: "click",
            callback: () => {
              brand.name !== "More .." &&
                router.navigate(`/products/${brand.name}`);
              //   renderProductFilter(brand.name);
            },
          },
        ],
      })
    ),
  });
};

export const filterHeader = (brand) => {
  return El({
    element: "div",
    className: "flex items-center gap-4 py-4 px-6 bg-white shadow",
    children: [
      El({
        element: "button",
        className: "text-gray-700 text-2xl font-semibold",
        textContent: "←",
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/"),
          },
        ],
      }),
      El({
        element: "span",
        className: "text-xl font-bold text-gray-900",
        innerText: brand,
      }),
    ],
  });
};

// export const showPageBrand = () => {
//   return El({
//     element: "div",
//     className: "flex-1",
//     children: [filterHeader()],
//   });
// };
