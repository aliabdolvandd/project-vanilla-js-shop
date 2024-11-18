import { El } from "../../script";
import { renderProduct } from "../../utils/render";

const categoriesList = [
  {
    name: "All",
  },
  {
    name: "Nike",
  },
  {
    name: "Adidas",
  },
  {
    name: "Puma",
  },
];
let buttonAll = "All";

export const categories = () => {
  return El({
    element: "div",
    className: "flex gap-2 overflow-x-auto pb-2 ml-5",
    children: categoriesList.map((category) => {
      return El({
        element: "button",
        className: ` flex items-center justify-center
      px-4 py-2 text-sm font-medium border rounded-full 
       ${
         buttonAll === category.name
           ? "bg-gray-800 text-white"
           : "text-gray-700 border-gray-300"
       }
      hover:bg-gray-800 hover:text-white transition
    `,
        textContent: category.name,
        // eventListener: [
        //   {
        //     event: "click",
        //     callback: renderProduct(),
        //   },
        // ],
      });
    }),
  });
};
