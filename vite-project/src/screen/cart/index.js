import { El } from "../../script";
import {
  getStorage,
  render,
  renderCartPage,
  reRender,
} from "../../utils/render";
import { getData } from "../../api/getApi";
import { svgs } from "../../svgs";
import { patchRequest } from "../../api/patch";
import { createDeleteModal } from "./removeDialog";
import { layout } from "../../layout";
import { generateColor } from "../detailePage";
import { setStorage } from "../../utils/render";
import { router } from "../../router/index.routes";

let updateQuantity = async function (productId, change) {
  let userData = getStorage("user");
  let cart = userData.cart || [];
  let productIndex = cart.findIndex((item) => item.id === productId);
  if (productIndex > -1) {
    cart[productIndex].quantity += change;
    if (cart[productIndex].quantity < 1) {
      cart[productIndex].quantity = 1;
    }
    userData.cart = cart;
    localStorage.setItem("user", JSON.stringify(userData));
    userData && (await patchRequest(`/users/${userData.id}`, { cart }));
    reRender(await renderCartPage());
  }
};

export let TotalPriceCart = function (items, productPrice) {
  let userData = getStorage("user");
  let cart = userData.cart || [];
  // sum = 0
  return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  // let totalPrice = productIndex.forEach(() => {});
};
export const cartPage = function (cartProduct) {
  return El({
    element: "div",
    className: "flex flex-col h-full bg-gray-50 p-4 gap-4",
    children: [
      // Header Section
      El({
        element: "header",
        className: "flex items-center justify-between py-4",
        children: [
          El({
            element: "div",
            className: "flex items-center gap-2",
            children: [
              El({
                element: "img",
                className: "w-6 h-6",
                restAttrs: { src: "images/logo.png" },
              }),
              El({
                element: "h2",
                className: "text-xl font-bold text-gray-900",
                innerText: "My Cart",
              }),
            ],
          }),
          El({
            element: "button",
            innerHTML: svgs.search,
          }),
        ],
      }),
      // Products Section
      El({
        element: "div",
        className: "flex flex-1 flex-col gap-4 h-40",
        children: cartProduct.map((items) => {
          return El({
            element: "div",
            className:
              "flex items-center justify-between shadow-md rounded-lg p-4 relative h-36",
            children: [
              // Product Image
              El({
                element: "img",
                className: "w-24 h-24 object-cover rounded-lg",
                restAttrs: { src: items.images, alt: items.title },
              }),
              El({
                element: "div",
                className: "flex-1 mx-4",
                children: [
                  El({
                    element: "h2",
                    className: "text-lg font-bold text-gray-900",
                    textContent: items.title,
                  }),
                  El({
                    element: "div",
                    className: "flex gap-2 items-center",
                    children: [
                      El({
                        element: "div",
                        className: `w-4 h-4 rounded-full ring-1 ${generateColor(
                          items.selectedColor
                        )}`,
                      }),
                      El({
                        element: "span",
                        className: `text-lg${generateColor(
                          items.selectedColor
                        )}`,
                        innerText: `${items.selectedColor} | Size: ${items.selectedSize}`,
                      }),
                    ],
                  }),
                  El({
                    element: "p",
                    className: "text-xl font-bold text-gray-800",
                    textContent: `$${items.price}`,
                  }),
                ],
              }),
              // Quantity Controls
              El({
                element: "div",
                className:
                  "flex  items-center gap-4 bg-gray-200 rounded-full px-2 py-1 absolute bottom-6 right-6",
                children: [
                  El({
                    element: "button",
                    className: "text-gray-600 text-xl",
                    innerHTML: svgs.Mines,
                    eventListener: [
                      {
                        event: "click",
                        callback: async () =>
                          await updateQuantity(items.id, -1),
                      },
                    ],
                  }),
                  El({
                    element: "span",
                    className: "text-lg font-bold text-gray-900",
                    id: "quantity",
                    innerText: items.quantity,
                  }),
                  El({
                    element: "button",
                    innerHTML: svgs.Plus,
                    eventListener: [
                      {
                        event: "click",
                        callback: async () => await updateQuantity(items.id, 1),
                      },
                    ],
                  }),
                ],
              }),
              // Delete Button
              El({
                element: "button",
                className: "absolute top-2 right-2",
                innerHTML: svgs.Trash,
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      createDeleteModal(items);
                    },
                  },
                ],
              }),
            ],
          });
        }),
      }),
      El({
        element: "div",
        className:
          "flex items-center justify-between shadow-lg rounded-lg p-4 pb-24 w-full",
        children: [
          El({
            element: "div",
            className: "flex flex-col",
            children: [
              El({
                element: "P",
                className: "text-sm font-bold text-gray-400",
                innerText: "Total Price",
              }),
              El({
                element: "span",
                id: "totalPrice",
                className: "text-2xl font-bold text-gray-900",
                innerText: `$${TotalPriceCart(cartProduct)}`,
              }),
            ],
          }),
          El({
            element: "button",
            className:
              "w-60 h-14 bg-black text-white py-2 px-6 rounded-full font-semibold text-lg",
            innerText: "Checkout ",
            eventListener: [
              {
                event: "click",
                callback: () => router.navigate("/checkout"),
              },
            ],
          }),
        ],
      }),
    ],
  });
};
