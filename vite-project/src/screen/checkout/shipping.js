import { getData } from "../../api/getApi";
import { patchRequest } from "../../api/patch";
import { postRequest } from "../../api/post";
import { El } from "../../script";
import { svgs } from "../../svgs";
import { getStorage, render, setStorage } from "../../utils/render";

export const shipping = function () {
  const shippingList = [
    {
      title: "Economy",
      details: "Estimated Arrival Des 20-23",
      price: 10,
      isDefault: false,
    },
    {
      title: "Regular",
      details: "Estimated Arrival Des 21-22",
      price: 15,
      isDefault: false,
    },
    {
      title: "Cargo",
      details: "Estimated Arrival Des 19-20",
      price: 20,
      isDefault: false,
    },
    {
      title: "Express",
      details: "Estimated Arrival Des 20-21",
      price: 30,
      isDefault: false,
    },
  ];

  // Header
  const shippingPage = El({
    element: "div",
    className: "p-4 space-y-6 h-screen flex flex-col",
    children: [
      // Header
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
            className: "font-bold text-lg",
            innerText: " Choose Shipping",
          }),
        ],
      }),
      // Address List
      El({
        element: "div",
        className: "flex-1 overflow-y-auto space-y-4",
        children: shippingList.map((shipping) => {
          return El({
            element: "div",
            className:
              "flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition gap-2",

            children: [
              // Icon
              El({
                element: "div",
                className:
                  "flex items-center justify-center w-11 h-11 bg-gray-300 rounded-full text-white",
                children: [
                  El({
                    element: "div",
                    innerHTML: svgs.Shipping,
                  }),
                  //   El({
                  //     element: "div",
                  //     className:
                  //       "w-8 h-8 rounded-full bg-black flex items-center justify-center",
                  //     children: [

                  //     ],
                  //   }),
                ],
              }),
              // Address Info
              El({
                element: "div",
                className: "flex flex-col flex-1 mx-4 ",
                children: [
                  El({
                    element: "h4",
                    className: "font-bold text-lg truncate",
                    innerText: shipping.title,
                  }),
                  El({
                    element: "span",
                    className: "text-sm text-gray-500 truncate",
                    innerText: shipping.details,
                  }),
                ],
              }),
              El({
                element: "span",
                className: "font-bold tex-xl ",
                innerText: `$${shipping.price}`,
              }),
              // Radio Button
              El({
                element: "input",
                className: "form-radio w-6 h-6 text-black",
                restAttrs: {
                  type: "radio",
                  name: "Choose shipping",
                  //   checked: address.isDefault ? "checked" : "",
                },
              }),
            ],
          });
        }),
      }),
      // Apply Button
      El({
        element: "button",
        className:
          "w-full py-3 text-white bg-black rounded-lg hover:bg-gray-800 ",
        innerText: "Apply",
        eventListener: [
          {
            event: "click",
            callback: () => {
              const userId = getStorage("user").id;

              const userData = getData(`/users/${userId}`);
              const selectedShipping = shippingList.find((index) => {
                const radio =
                  document.getElementsByName("Choose shipping")[index];
                return radio && radio.checked;
              });
              if (selectedShipping) {
                patchRequest(
                  `/users/${userId}`,

                  {
                    shippingMethod: {
                      title: selectedShipping.title,
                      details: selectedShipping.details,
                      price: selectedShipping.price,
                    },
                  }
                );
              }
              setStorage("selectedShipping", selectedShipping);
            },
          },
        ],
      }),
    ],
  });

  return render(shippingPage);
};
