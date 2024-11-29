import { getData } from "../../api/getApi";
import { router } from "../../router/index.routes";
import { El } from "../../script";
import { svgs } from "../../svgs";
import { getStorage } from "../../utils/render";
import { TotalPriceCart } from "../cart";
import { generateColor } from "../detailePage";

const finalPrice = function (cart, shippingCost = 0, discount = 0) {
  let totalItemsPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  let finalTotal = totalItemsPrice + shippingCost - discount;
  if (finalTotal <= 0) {
    finalTotal = "-";
  } else {
    return finalTotal;
  }
};

export const checkoutPage = async function () {
  const userId = getStorage("user").id;
  const userData = await getData(`/users/${userId}`);
  const cart = userData.cart || [];
  const selectedShipping = getStorage("selectedShipping");
  return El({
    element: "div",
    className:
      "w-full h-screen flex flex-col bg-white px-4 py-2 gap-3 overflow-scroll pb-20",
    children: [
      El({
        //  Header
        element: "div",
        className: "flex items-center justify-between py-4",
        children: [
          El({
            element: "button",
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
            className: "text-xl font-bold text-gray-800",
            innerText: "Checkout",
          }),
          El({
            element: "button",
            innerHTML: svgs.More,
          }),
        ],
      }),
      // Shipping Address
      El({
        element: "div",
        children: [
          El({
            element: "h2",
            className: "font-bold text-xl",
            innerText: "Shipping Address",
          }),
          El({
            element: "div",
            className:
              "flex items-center justify-between bg-gray-100 rounded-lg p-4 my-4",
            children: [
              El({
                element: "div",
                className: "flex items-center  gap-4",
                children: [
                  El({
                    element: "div",

                    className:
                      "w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center",
                    children: [
                      El({
                        element: "div",
                        className:
                          "w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center",
                        children: [
                          El({
                            element: "span",
                            className: "w-6 h-6",
                            innerHTML: svgs.Location,
                          }),
                        ],
                      }),
                    ],
                  }),
                  El({
                    element: "div",
                    className: "flex flex-col",
                    children: [
                      El({
                        element: "p",
                        className: "font-medium text-gray-800",
                        innerText: "Home",
                      }),
                      El({
                        element: "p",
                        className: "text-sm text-gray-500",
                        innerText: "6440 Sunbrook Park, PC 5679",
                      }),
                    ],
                  }),
                ],
              }),

              El({
                element: "button",
                className: "w-4 h-4",
                innerHTML: svgs.Edit,
                eventListener: [
                  {
                    event: "click",
                    callback: () => router.navigate("/addres"),
                  },
                ],
              }),
            ],
          }),
        ],
      }),

      // Order list
      El({
        element: "div",
        children: [
          El({
            element: "span",
            className: "text-lg font-bold text-gray-800 mb-4",
            innerText: "Order List",
          }),
          ...cart.map((items) => {
            return El({
              element: "div",
              className:
                "flex items-center bg-gray-100 rounded-lg p-4 shadow-sm h-32",
              children: [
                El({
                  element: "img",
                  className: "w-24 h-24 rounded-lg mr-4",
                  restAttrs: { src: items.images, alt: items.title },
                }),
                El({
                  element: "div",
                  className: "flex flex-col items-center gap-3",
                  children: [
                    El({
                      element: "div",
                      className: "flex flex-col gap-2",
                      children: [
                        El({
                          element: "p",
                          className: "font-medium text-gray-800",
                          innerText: items.title,
                        }),
                        El({
                          element: "div",
                          className: "flex gap-2",
                          children: [
                            El({
                              element: "div",
                              className: `w-6 h-6 rounded-full ${generateColor(
                                items.selectedColor
                              )}`,
                            }),
                            El({
                              element: "p",
                              className: "text-sm text-gray-500",
                              innerText: `${items.selectedColor}  |  Size= ${items.selectedSize}`,
                            }),
                          ],
                        }),
                        El({
                          element: "div",
                          className: "flex justify-between ",
                          children: [
                            El({
                              element: "span",
                              className: "font-bold text-xl",
                              innerText: `$${items.price}`,
                            }),
                            El({
                              element: "span",
                              className: "font-bold text-xl ml-52",
                              innerText: items.quantity,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          }),
        ],
      }),
      // Chose Shipping
      El({
        element: "div",
        className: "my-6",
        children: [
          El({
            element: "h2",
            className: "text-lg font-bold text-gray-800 mb-4",
            innerText: "Shipping Method",
          }),
          selectedShipping
            ? El({
                element: "div",
                className:
                  "flex justify-between items-center bg-gray-100 p-4 rounded-lg",
                children: [
                  El({
                    element: "div",
                    className: "flex flex-col",
                    children: [
                      El({
                        element: "h3",
                        className: "font-bold text-lg text-gray-800",
                        innerText: selectedShipping.title,
                      }),
                      El({
                        element: "p",
                        className: "text-sm text-gray-500",
                        innerText: selectedShipping.details,
                      }),
                      El({
                        element: "p",
                        className: "text-md font-bold text-gray-800",
                        innerText: `$${selectedShipping.price}`,
                      }),
                    ],
                  }),
                  El({
                    element: "button",
                    className:
                      "bg-gray-300 py-2 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-400",
                    innerHTML: svgs.Edit,
                    eventListener: [
                      {
                        event: "click",
                        callback: () => router.navigate("/shipping"),
                      },
                    ],
                  }),
                ],
              })
            : El({
                element: "button",
                className:
                  "flex justify-start items-center gap-4 w-full bg-gray-100 p-4 rounded-lg text-gray-800 font-medium",
                children: [
                  El({
                    element: "span",
                    innerHTML: svgs.Shipping,
                  }),
                  El({
                    element: "span",
                    className: "text-xl font-bold",
                    innerText: "Choose Shipping Type",
                  }),
                  El({
                    element: "span",
                    className: "ml-20 text-2xl",
                    innerHTML: "→",
                  }),
                ],
                eventListener: [
                  {
                    event: "click",
                    callback: () => router.navigate("/shipping"),
                  },
                ],
              }),
        ],
      }),
      // Promo Code
      El({
        element: "div",
        className: "my-6",
        children: [
          El({
            element: "h2",
            className: "text-lg font-bold text-gray-800 mb-4",
            innerText: " Promo Code",
          }),
          El({
            element: "div",
            className: "flex items-center",
            children: [
              El({
                element: "input",
                className:
                  "flex-grow bg-gray-100 p-4 rounded-lg text-gray-800 placeholder-gray-500 border-none focus:outline-none",
                restAttrs: { type: "text", placeHolder: "Enter Promo Code" },
              }),
              El({
                element: "button",
                className:
                  "ml-4 bg-black text-white p-4 rounded-lg font-bold text-lg",
                innerHTML: svgs.Plus,
              }),
            ],
          }),
        ],
      }),
      // Amount Summary
      El({
        element: "div",
        className: "my-6 space-y-2 rounded-md shadow-md p-5",
        children: [
          El({
            element: "div",
            className:
              "flex flex-col font-bold text-lg justify-between text-gray-800 gap-6",
            children: [
              createSummaryRow("Amount", TotalPriceCart()),
              createSummaryRow("Shipping", "-"),
              createSummaryRow("Total", finalPrice(cart)),
            ],
          }),
        ],
      }),
      // Continue to Payment Button
      El({
        element: "button",
        className:
          "bg-black text-white py-4 px-6 rounded-2xl font-bold text-center mt-6 w-full",
        innerText: "Continue to Payment →",
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/payment"),
          },
        ],
      }),
    ],
  });
};

const createSummaryRow = (label, value, additionalClasses = "") => {
  return El({
    element: "div",
    className: `flex justify-between text-gray-800`,
    children: [
      El({
        element: "p",
        innerText: label,
      }),
      El({
        element: "p",
        innerText: `$${value}`,
      }),
    ],
  });
};
