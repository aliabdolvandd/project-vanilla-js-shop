import { El } from "../../script";
import { svgs } from "../../svgs";
import { render } from "../../utils/render";
import { getStorage } from "../../utils/render";
import { patchRequest } from "../../api/patch";
import { getData } from "../../api/getApi";
import { setStorage } from "../../utils/render";
import { createPaymentModal } from "./checkoutModal";

export const paymentMethodsPage = function () {
  const paymentMethods = [
    { label: "My Wallet", icon: "images/images1.png" },
    { label: "PayPal", icon: "images/paypal.png" },
    { label: "Google Pay", icon: "/images/search.png" },
    { label: "Apple Pay", icon: "/images/apple-logo.png" },
    { label: ".... .... .... 4679", icon: "/images/mc.png" },
  ];

  const paymentPage = El({
    element: "div",
    className: "p-4 space-y-6 h-screen flex flex-col",
    children: [
      El({
        element: "div",
        className: "flex items-center gap-8 mb-4",
        children: [
          El({
            element: "button",
            className: "w-8 h-8",
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
            className: "font-bold text-xl",
            innerText: "Payment Methods",
          }),
        ],
      }),
      El({
        element: "span",
        className: "text-lg text-gray-400 ",
        innerText: "Select the payment method you  want to use",
      }),
      ...paymentMethods.map((item) => {
        return El({
          element: "div",
          className:
            "flex items-center  p-2 border rounded-lg hover:shadow-md transition gap-2",
          children: [
            El({
              element: "div",
              className:
                "flex items-center justify-center w-14 h-14 bg-gray-300 rounded-full text-white",
              children: [
                El({
                  element: "img",
                  className: "w-10 h-10 bg-cover",
                  restAttrs: { src: item.icon },
                }),
              ],
            }),
            El({
              element: "div",
              className: "flex justify-between flex-1",
              children: [
                El({
                  element: "span",
                  className: "font-bold text-xl",
                  innerText: item.label,
                }),
                El({
                  element: "input",
                  className: "form-radio w-6 h-6 text-black",
                  restAttrs: {
                    type: "radio",
                    name: "Choose Payment",
                    //   checked: address.isDefault ? "checked" : "",
                  },
                }),
              ],
            }),
          ],
        });
      }),
      El({
        element: "button",
        className:
          "w-full py-3 text-white bg-black rounded-lg hover:bg-gray-800  ",
        innerText: "Confirm Payment",
        eventListener: [
          {
            event: "click",
            callback: async () => {
              const userId = getStorage("user").id;
              const userData = await getData(`/users/${userId}`);
              const cart = userData.cart || [];

              const orders = userData.orders || [];

              cart.forEach((cartItem) => {
                const productIndex = orders.findIndex(
                  (item) => item.id === cartItem.id
                );
                if (productIndex > -1) {
                  orders[productIndex].quantity += cartItem.quantity;
                } else {
                  orders.push(cartItem);
                }
              });
              // console.log(orders);

              await patchRequest(`/users/${userId}`, { orders });

              await patchRequest(`/users/${userId}`, { cart: [] });
              setStorage("user", { ...userData, orders, cart: [] });
              createPaymentModal();
            },
          },
        ],
      }),
    ],
  });
  return render(paymentPage);
};
