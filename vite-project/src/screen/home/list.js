import { data } from "autoprefixer";
import { router } from "../../router/index.routes";
import { El } from "../../script";
import {
  renderCategoryItems,
  renderPopular,
  reRender,
} from "../../utils/render";
// import { renderCategoryItems, renderProduct } from "../../utils/render";

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
// categories brands
export const categories = (selected) => {
  // console.log(selected);

  return El({
    element: "div",
    className: "flex gap-2 overflow-x-auto pb-2 ml-5",
    children: categoriesList.map((category) => {
      return El({
        element: "button",
        className: `capitalize flex items-center justify-center overscroll-none	
      px-4 py-2 text-sm font-medium border rounded-full 
       ${
         selected === category.name
           ? "bg-gray-800 text-white"
           : "text-gray-700 border-gray-300"
       }
      hover:bg-gray-800 hover:text-white transition
    `,
        textContent: category.name,
        eventListener: [
          {
            event: "click",
            // handel page
            callback: async () => {
              if (router.current[0].url === "") {
                selectedCategory = category.name;

                const productListElm = document.getElementById("productList");

                productListElm.innerHTML = "";
                productListElm.append(await renderCategoryItems(category.name));
              } else if (router.current[0].url === "popular") {
                // selectedCategory = "all";
                reRender(
                  await renderPopular(
                    "",
                    category.name === "all" ? "" : category.name,
                    category.name
                  )
                );
              }
            },
          },
        ],
      });
    }),
  });
};
