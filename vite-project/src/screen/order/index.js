import { El } from "../../script";
import { svgs } from "../../svgs";

const renderOrderItem = (order) => {
  return El({
    element: "div",
    className: "flex items-center justify-between p-4 border-b border-gray-200",
    children: [
      El({
        element: "div",
        children: [
          El({
            element: "h2",
            innerText: order.title,
            className: "text-lg font-semibold",
          }),
          El({
            element: "p",
            innerText: `$${order.price}`,
            className: "text-gray-500 text-sm",
          }),
        ],
      }),
      El({
        element: "img",
        src: order.image,
        alt: order.title,
        className: "w-12 h-12 rounded",
      }),
    ],
  });
};

const toggleTab = (tab) => {
  const ordersContainer = document.querySelector("#ordersContainer");
  if (tab === "active") {
    ordersContainer.innerHTML = "";
    const activeOrders = getActiveOrders();
    if (activeOrders.length > 0) {
      activeOrders.forEach((order) => {
        ordersContainer.append(renderOrderItem(order));
      });
    } else {
      ordersContainer.append(renderEmptyMessage("active"));
    }
  } else if (tab === "completed") {
    ordersContainer.innerHTML = "";
    const completedOrders = getCompletedOrders();
    if (completedOrders.length > 0) {
      completedOrders.forEach((order) => {
        ordersContainer.append(renderOrderItem(order));
      });
    } else {
      ordersContainer.append(renderEmptyMessage("completed"));
    }
  }
};

// test order
const getActiveOrders = () => {
  return [
    { title: "Product A", price: 120, image: "path-to-image-a.svg" },
    { title: "Product B", price: 90, image: "path-to-image-b.svg" },
  ];
};

export const ordersPage = () => {
  return El({
    element: "div",
    className: "flex flex-col w-full h-full bg-white",
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
            eventListener: [
              {
                event: "click",
                callback: () => toggleTab("active"),
              },
            ],
          }),
        ],
      }),

      // Orders List (or Empty Message)
      El({
        element: "div",
        id: "ordersContainer",
        className: "flex-grow flex items-center justify-center px-4",
        children: [
          El({
            element: "div",
            className: "text-center text-gray-400",
            children: [
              El({
                element: "img",
                className: "w-40 h-40 mx-auto mb-4",
                restAttrs: { src: "images/not-found.png" },
              }),
              El({
                element: "p",
                innerText: "You don’t have an order yet",
                className: "text-lg font-semibold",
              }),
              El({
                element: "p",
                innerText: "You don’t have any active orders at this time.",
                className: "text-sm text-gray-500",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
