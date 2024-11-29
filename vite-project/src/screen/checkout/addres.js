import { getData } from "../../api/getApi";
import { patchRequest } from "../../api/patch";
import { postRequest } from "../../api/post";
import { El } from "../../script";
import { svgs } from "../../svgs";
import { getStorage, render, setStorage } from "../../utils/render";
import { detail } from "../detailePage";
import { openAddressModal } from "./addAddres";

export const address = function () {
  const addressList = [
    {
      title: "Home",
      details: "61480 Sunbrook Park, PC 5679",
      isDefault: true,
    },
    {
      title: "Office",
      details: "6993 Meadow Valley Terra, PC 3637",
      isDefault: false,
    },
    {
      title: "Apartment",
      details: "21833 Clyde Gallagher, PC 4662",
      isDefault: false,
    },
    {
      title: "Parent's House",
      details: "5259 Blue Bill Park, PC 4627",
      isDefault: false,
    },
  ];

  // Header
  const addresPage = El({
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
            innerText: "Shipping Address",
          }),
        ],
      }),
      // Address List
      El({
        element: "div",
        className: "flex-1 overflow-y-auto space-y-4",
        children: addressList.map((address) => {
          return El({
            element: "div",
            className:
              "flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition",
            children: [
              // Icon
              El({
                element: "div",
                className:
                  "flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-white",
                children: [
                  El({
                    element: "div",
                    className:
                      "w-8 h-8 rounded-full bg-black flex items-center justify-center",
                    children: [
                      El({
                        element: "div",
                        innerHTML: svgs.Location,
                      }),
                    ],
                  }),
                ],
              }),
              // Address Info
              El({
                element: "div",
                className: "flex flex-col flex-1 mx-4",
                children: [
                  El({
                    element: "h4",
                    className: "font-bold text-lg truncate",
                    innerText: address.title,
                  }),
                  El({
                    element: "span",
                    className: "text-sm text-gray-500 truncate",
                    innerText: address.details,
                  }),
                ],
              }),
              // Radio Button
              El({
                element: "input",
                className: "form-radio w-6 h-6 text-black",
                restAttrs: {
                  type: "radio",
                  name: "shippingAddress",
                  checked: address.isDefault ? "checked" : "",
                },
              }),
            ],
          });
        }),
      }),
      // Add New Address Button
      El({
        element: "button",
        className:
          "w-full h-14 text-black bg-gray-400 rounded-3xl font-bold hover:bg-gray-600 ",
        innerText: "Add New Address",
        eventListener: [
          {
            event: "click",
            callback: () => {
              openAddressModal();
            },
          },
        ],
      }),
      // Apply Button
      El({
        element: "button",
        className:
          "w-full py-3 text-white bg-black rounded-lg hover:bg-gray-800 ",
        innerText: "Apply",
        // eventListener: [
        //   {
        //     event: "click",
        //     callback: () => {
        // const userId = getStorage("user").id;
        // const userData = getData(`/users/${userId}`);
        // const selectedAddres = addressList.find((index) => {
        // console.log(addressList);

        // const radio =
        //   document.getElementsByName("shippingAddress")[index];
        // console.log(radio);

        // return radio && radio.checked;
        // });
        // setStorage("selectedAddres", selectedAddres);
        // console.log(selectedAddres);

        // if (selectedAddres) {
        // patchRequest(`/user/${userId}`, {
        //   selectedAddresList: {
        //     title: selectedAddres.title,
        //     details: selectedAddres.details,
        //   },
        // });

        // }
        //     },
        //   },
        // ],
      }),
    ],
  });

  return render(addresPage);
};
