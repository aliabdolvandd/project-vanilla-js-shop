import { El } from "../../script";
import { getStorage, renderCartPage, reRender } from "../../utils/render";
import { patchRequest } from "../../api/patch";

const handleDelete = async (item) => {
  const userData = getStorage("user");
  const cart = userData.cart || [];
  const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
  userData.cart = updatedCart;
  localStorage.setItem("user", JSON.stringify(userData));
  await patchRequest(`/users/${userData.id}`, { cart: updatedCart });
  reRender(await renderCartPage());
};

export const createDeleteModal = (item) => {
  const modal = El({
    element: "div",
    className:
      "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50",
    children: [
      El({
        element: "div",
        className:
          "bg-white rounded-t-3xl p-6 w-full max-w-md shadow-lg relative animate-slideUp",
        children: [
          El({
            element: "h2",
            className: "text-lg font-bold text-center text-gray-800 mb-6",
            textContent: "Remove From Cart?",
          }),

          El({
            element: "div",
            className: "flex items-center gap-4 mb-6",
            children: [
              El({
                element: "img",
                className: "w-24 h-24 rounded-md object-cover",
                restAttrs: {
                  src: item.images,
                  alt: item.title,
                },
              }),
              El({
                element: "div",
                className: "flex flex-col gap-2",
                children: [
                  El({
                    element: "h3",
                    className: "text-gray-800 font-bold text-xl",
                    textContent: item.title,
                  }),
                  El({
                    element: "p",
                    className: "text-gray-600 text-lg",
                    textContent: `${item.selectedColor} | Size =${item.selectedSize}`,
                  }),
                  El({
                    element: "span",
                    className: "text-gray-900 font-bold",
                    textContent: `$${item.price}`,
                  }),
                ],
              }),
            ],
          }),

          El({
            element: "div",
            className: "flex justify-between gap-4",
            children: [
              El({
                element: "button",
                className:
                  "w-full py-3 rounded-full bg-gray-300 text-gray-700 font-semibold",
                textContent: "Cancel",
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      modal.remove();
                    },
                  },
                ],
              }),

              El({
                element: "button",
                className:
                  "w-full py-3 rounded-full bg-black text-white font-semibold",
                textContent: "Yes, Remove",
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      handleDelete(item);
                      modal.remove();
                    },
                  },
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  document.body.appendChild(modal);
};
