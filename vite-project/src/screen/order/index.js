import { getData } from "../../api/getApi";
import { router } from "../../router/index.routes";
import { El } from "../../script";
import { svgs } from "../../svgs";
import { getStorage, renderDetaile } from "../../utils/render";
import { generateColor } from "../detailePage";

const renderOrderItem = async () => {
  const userId = getStorage("user").id;
  const user = await getData(`/users/${userId}`);

  const orders = user.orders || [];

  if (orders.length === 0) {
    return El({
      element: "div",
      className:
        "flex flex-col items-center justify-center h-full text-gray-400",
      children: [
        El({
          element: "img",
          className: "w-40 h-40 mb-4",
          restAttrs: { src: "images/not-found.png", alt: "No Orders" },
        }),
        El({
          element: "p",
          className: "text-lg font-semibold",
          innerText: "You don’t have an order yet",
        }),
      ],
    });
  }

  return El({
    element: "div",
    className: "flex flex-col gap-4 p-4 w-full",
    children: orders.map((items) => {
      return El({
        element: "div",
        className:
          "flex items-center justify-between shadow-md rounded-lg p-4 relative h-36",
        children: [
          // Product Image
          El({
            element: "img",
            className: "w-28 h-28 object-cover rounded-lg",
            restAttrs: { src: items.images, alt: items.title },
          }),
          // Product Details
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
                    className: "text-sm text-gray-500",
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
          // Review Button
          El({
            element: "button",
            className:
              "absolute bottom-4 right-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 text-sm",
            innerText: "Review",
            // eventListener: [
            //   {
            //     event: "click",
            //     callback: () => {
            //       router.navigate("/product/");
            //     },
            //   },
            // ],
            // eventListener: [
            //   {
            //     event: "click",
            //     callback: () => {
            //       router.navigate(`/product/`);
            //       renderDetaile();
            //     },
            //   },
            // ],
          }),
        ],
      });
    }),
  });
};

const toggleTab = async (tab) => {
  const ordersContainer = document.querySelector("#ordersContainer");
  const activeTab = document.querySelector("[data-tab='active']");
  const completedTab = document.querySelector("[data-tab='completed']");

  if (tab === "active") {
    activeTab.classList.add("text-black", "border-b-2", "border-black");
    activeTab.classList.remove("text-gray-400");
    completedTab.classList.remove("text-black", "border-b-2", "border-black");
    completedTab.classList.add("text-gray-400");
  } else {
    completedTab.classList.add("text-black", "border-b-2", "border-black");
    completedTab.classList.remove("text-gray-400");
    activeTab.classList.remove("text-black", "border-b-2", "border-black");
    activeTab.classList.add("text-gray-400");
  }

  ordersContainer.innerHTML = "";
  const orders = await renderOrderItem();
  if (Array.isArray(orders)) {
    orders.forEach((order) => {
      ordersContainer.append(order);
    });
  } else {
    ordersContainer.append(orders);
  }
};

export const ordersPage = () => {
  return El({
    element: "div",
    className: "flex flex-col w-full h-full",
    children: [
      // Header
      El({
        element: "header",
        className:
          "flex justify-between items-center px-4 py-2 border-b border-gray-200",
        children: [
          El({
            element: "div",
            className: "flex items-center",
            children: [
              El({
                element: "img",
                className: "w-6 h-6",
                restAttrs: { src: "images/logo.png", alt: "logo" },
              }),
              El({
                element: "h1",
                innerText: "My Orders",
                className: "ml-2 text-lg font-semibold",
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex items-center space-x-4",
            children: [
              El({
                element: "button",
                className: "w-5 h-5 text-gray-400",
                innerHTML: svgs.search,
              }),
              El({
                element: "button",
                className: "w-5 h-5 text-gray-400",
                innerHTML: svgs.More,
              }),
            ],
          }),
        ],
      }),

      // Tabs (Active & Completed)
      El({
        element: "div",
        className: "flex items-center justify-around mt-4",
        children: [
          El({
            element: "button",
            innerText: "Active",
            className: "text-black font-semibold border-b-2 border-black pb-1",
            restAttrs: { "data-tab": "active" },
            eventListener: [
              {
                event: "click",
                callback: () => toggleTab("active"),
              },
            ],
          }),
          El({
            element: "button",
            innerText: "Completed",
            className: "text-gray-400 font-semibold pb-1",
            restAttrs: { "data-tab": "completed" },
            eventListener: [
              {
                event: "click",
                callback: () => toggleTab("completed"),
              },
            ],
          }),
        ],
      }),

      // Orders List (or Empty Message)
      El({
        element: "div",
        id: "ordersContainer",
        className: "flex-1 flex  px-4",
        children: [],
      }),
    ],
  });
};
