import { data } from "autoprefixer";
import { router } from "../../router/index.routes";
import { El } from "../../script";
import { renderCategoryItems } from "../../utils/render";
// import { renderCategori, renderProduct } from "../../utils/render";

// let buttonAll = "all";
let selectedCategory = "all";
export const categoriesList = [
  { name: "all" },
  { name: "nike" },
  { name: "adidas" },
  { name: "puma" },
  { name: "asics" },
  { name: "converse" },
  { name: "newbalance" },
  { name: "reebok" },
];

export const categories = () => {
  return El({
    element: "div",
    className: "flex gap-2 overflow-x-auto pb-2 ml-5",
    children: categoriesList.map((category) => {
      return El({
        element: "button",
        className: `capitalize flex items-center justify-center
      px-4 py-2 text-sm font-medium border rounded-full 
       ${
         selectedCategory === category.name
           ? "bg-gray-800 text-white"
           : "text-gray-700 border-gray-300"
       }
      hover:bg-gray-800 hover:text-white transition
    `,
        textContent: category.name,
        eventListener: [
          {
            event: "click",

            callback: async () => {
              selectedCategory = category.name;
              // await renderCategori(selectedCategory);
              const productListElm = document.getElementById("productList");
              productListElm.innerHTML = "";
              productListElm.append(
                await renderCategoryItems(selectedCategory)
              );
            },
          },
        ],
      });
    }),
  });
};
