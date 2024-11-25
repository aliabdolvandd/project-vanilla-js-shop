import { El } from "../../script";
import { getStorage, render } from "../../utils/render";
import { getData } from "../../api/getApi";

export const cartPage = function (cartProduct) {
  return El({
    element: "div",
    className: "p-4 flex flex-col gap-6",
    children: [
      El({
        element: "h1",
        className: "p-4 flex flex-col gap-6 ",
        innerText: "My Cart",
      }),
      ...cartProduct.map((items) =>
        El({
          element: "div",
          className:
            "flex items-center justify-between p-4 border rounded-lg shadow-sm",
          children: [
            El({
              element: "div",
              className: "flex items-center gap-4",
              children: [
                El({
                  element: "img",
                  className: "w-20 h-20 object-cover rounded-lg",
                  restAttrs: { src: items.images, alt: items.title },
                }),
                El({
                  element: "div",
                  className: "flex flex-col gap-1",
                  children: [
                    El({
                      element: "h2",
                      className: "text-2xl font-bold",
                      innerHTML: items.title,
                    }),
                    El({
                      element: "div",
                      className: `w-6 h-6 rounded-full ring-[1px] bg-[${items.selectedColor}]`,
                      innerHTML: items.selectedColor,
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      ),
    ],
  });
};
