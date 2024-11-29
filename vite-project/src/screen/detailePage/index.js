import { patchRequest } from "../../api/patch";
import { postRequest } from "../../api/post";
import { router } from "../../router/index.routes";
import { El } from "../../script";
import { svgs } from "../../svgs";
import { getData } from "../../api/getApi";
import { getStorage, renderWishList, setStorage } from "../../utils/render";

export function generateColor(color) {
  switch (color) {
    case "rose":
      return "bg-rose-400";
      break;
    case "emerald":
      return "bg-emerald-400";
      break;
    case "yellow":
      return "bg-yellow-400";
      break;
    case "gray":
      return "bg-gray-400";
      break;
    case "teal":
      return "bg-teal-400";
      break;
    case "red":
      return "bg-red-400";
    default:
      break;
  }
}

export const detail = function (product) {
  //
  let quantity = 1;
  let selectedColor = [];
  let selectedSize = [];
  // Update Products Numbers
  const updateQuantity = (newQty) => {
    quantity = newQty;
    qtyElement.textContent = quantity;
    updateTotalPrice();
  };
  // Total Price In Detail Page
  const updateTotalPrice = () => {
    const totalPrice = quantity * product.price;
    totalPriceElement.textContent = `$${totalPrice}`;
  };
  //Products Numbers
  const qtyElement = El({
    element: "span",
    id: "quantity",
    className: "text-lg",
    innerText: quantity,
  });

  const totalPriceElement = El({
    element: "span",
    className: "text-lg font-bold text-gray-800",
    textContent: `$${product.price}`,
  });
  // headers
  return El({
    element: "div",
    className: "flex flex-col gap-1 bg-gray-50 h-full",
    children: [
      El({
        element: "button",
        className: " w-10 px-4 py-2",
        innerHTML: svgs.Back,
        eventListener: [
          {
            event: "click",
            callback: () => history.back(),
          },
        ],
      }),
      // Products
      El({
        element: "div",
        className: "w-full h-60 flex items-center justify-center",
        children: [
          El({
            element: "img",
            className: "w-full h-60 object-cover",
            restAttrs: { src: product.images, alt: product.title },
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex justify-between mt-6 mx-4",
        children: [
          El({
            element: "h1",
            className: "text-3xl font-bold text-gray-900",
            textContent: product.title,
          }),
          El({
            element: "span",
            // Get Data For Wishlist
            eventListener: [
              {
                event: "click",
                callback: async (event) => {
                  try {
                    const user = getStorage("user");
                    const wishlist = user.wishlist || [];
                    const productIndex = wishlist.findIndex(
                      (item) => item.id === product.id
                    );

                    if (productIndex > -1) {
                      wishlist.splice(productIndex, 1);
                      await patchRequest(`/users/${user.id}`, { wishlist });
                      setStorage("user", { ...user, wishlist });

                      const targetSpan = event.target.closest("span");
                      targetSpan.innerHTML = svgs.Like;
                    } else {
                      wishlist.push(product);
                      await patchRequest(`/users/${user.id}`, { wishlist });

                      setStorage("user", { ...user, wishlist });
                      const targetSpan = event.target.closest("span");
                      targetSpan.innerHTML = svgs.likeFill;
                    }
                    // patchRequest(`/users/` + getStorage("user").id, {
                    //   wishlist: [...getStorage("user").wishlist, product],
                    // });
                    // setStorage("user", {
                    //   ...getStorage("user"),
                    //   wishlist: [...getStorage("user").wishlist, product],
                    // });
                  } catch (err) {
                    console.log(err);
                  }
                  //   getStorage("user").
                  //   const result = await postjson();Request("/users/wishlist", product);
                  //     console.log(result);
                },
              },
            ],
            innerHTML: getStorage("user").wishlist.some(
              (item) => item.id === product.id
            )
              ? svgs.likeFill
              : svgs.Like,
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex flex-col p-4 rounded-t-3xl",
        children: [
          El({
            element: "div",
            className: "flex items-center  gap-4 text-sm text-gray-600 mt-2",
            children: [
              El({
                element: "span",
                textContent: `${product.order} sold`,
              }),
              El({
                element: "span",
                innerHTML: svgs.Star,
              }),
            ],
          }),
          El({
            element: "h2",
            className: "font-bold mt-5",
            innerText: "Description",
          }),

          El({
            element: "p",
            className: "text-sm text-gray-700 mt-2",
            innerText:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pharetra ullamcorper eros, nec gravida turpis hendrerit viverra.",
          }),

          El({
            element: "div",
            className: "flex justify-between items-center mt-4",
            children: [
              El({
                element: "div",
                className: "flex  items-center gap-2",
                children: [
                  El({
                    element: "span",
                    className: "text-lg font-bold ",
                    textContent: "Size",
                  }),
                  ...product.size.map((item) => {
                    return El({
                      element: "div",
                      className: `flex justify-center items-center w-6 h-6 rounded-full shadow  shadow-gray`,
                      innerText: item,
                      restAttrs: { className: "size-option" },
                      eventListener: [
                        {
                          event: "click",
                          callback: (e) => {
                            selectedSize = item;
                            const allSizes =
                              document.querySelectorAll(".size-option");
                            allSizes.forEach((sizeEl) => {
                              sizeEl.classList.remove("ring-2", "ring-black");
                            });
                            e.currentTarget.classList.add(
                              "ring-2",
                              "ring-black"
                            );
                          },
                        },
                      ],
                    });
                  }),
                ],
              }),

              El({
                element: "div",
                className: "flex items-center gap-2",
                children: [
                  El({
                    element: "span",
                    className: "text-lg font-bold",
                    textContent: "Color",
                  }),
                  ...product.color.map((item) => {
                    return El({
                      element: "div",
                      className: `w-6 h-6 rounded-full ring ring-[1px] ${generateColor(
                        item
                      )}`,
                      restAttrs: { className: "color-option" },
                      eventListener: [
                        {
                          event: "click",
                          callback: (e) => {
                            selectedColor = item;
                            const allColor =
                              document.querySelectorAll(".color-option");
                            allColor.forEach((colorEl) => {
                              colorEl.classList.remove("ring-2", "ring-black");
                            });
                            e.currentTarget.classList.add(
                              "ring-2",
                              "ring-black"
                            );
                          },
                        },
                      ],
                      //   innerText: `${item}`,
                    });
                  }),
                ],
              }),
            ],
          }),

          El({
            element: "div",
            className:
              "flex justify-between items-center rounded-3xl mt-10 bg-gray-300 w-28 px-1 py-2",
            children: [
              El({
                element: "div",
                className: "flex items-center gap-6",
                children: [
                  El({
                    element: "button",
                    className: " text-lg",
                    innerHTML: svgs.Mines,
                    eventListener: [
                      {
                        event: "click",
                        callback: () => {
                          if (quantity > 1) updateQuantity(quantity - 1);
                        },
                      },
                    ],
                  }),
                  qtyElement,

                  El({
                    element: "button",
                    className: "text-lg",
                    innerHTML: svgs.Plus,
                    eventListener: [
                      {
                        event: "click",
                        callback: () => {
                          updateQuantity(quantity + 1);
                        },
                      },
                    ],
                  }),
                ],
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex justify-between items-center ",
            children: [
              El({
                element: "div",
                className: "flex flex-col gap-1 mt-6",
                children: [
                  El({
                    element: "p",
                    className: "font-bold text-sm text-gray-400",
                    innerText: "Total Price",
                  }),
                  totalPriceElement,
                ],
              }),
              El({
                element: "button",
                className:
                  "mt-6 w-64 bg-black text-white py-3 rounded-full text-lg font-semibold",
                textContent: "Add to Cart",
                // add data to server for cart list
                eventListener: [
                  {
                    event: "click",
                    callback: async () => {
                      const userId = getStorage("user").id;
                      const userData = await getData(`/users/${userId}`);
                      const cart = userData.cart || [];
                      const productIndex = cart.findIndex(
                        (item) => item.id === product.id
                      );

                      if (productIndex > -1) {
                        cart[productIndex].quantity += 1;
                      } else {
                        cart.push({
                          ...product,
                          quantity,
                          selectedSize,
                          selectedColor,
                        });
                      }

                      await patchRequest(`/users/${userId}`, { cart });

                      setStorage("user", { ...userData, cart });

                      // console.log(cart);
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
};
