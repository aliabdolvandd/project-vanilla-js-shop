import { router } from "../../router/index.routes";
import { El } from "../../script";

export const createPaymentModal = () => {
  // ایجاد مودال
  const modal = El({
    element: "div",
    className:
      "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50",
    children: [
      El({
        element: "div",
        className:
          "bg-white rounded-2xl p-6 w-full max-w-md shadow-lg flex flex-col items-center gap-6 relative",
        children: [
          // تصویر سبد خرید بزرگ در مرکز
          El({
            element: "div",
            className: "w-full flex justify-center",
            children: [
              El({
                element: "img",
                restAttrs: {
                  src: "images/payment-confirm.jpg", // مسیر آیکون سبد خرید
                  alt: "Cart Icon",
                },
                className: "w-32 h-32", // تصویر بزرگ‌تر
              }),
            ],
          }),
          // متن توضیحی
          El({
            element: "h2",
            className: "text-lg font-semibold text-gray-800 text-center px-4",
            textContent: "order successful",
          }),
          // دکمه‌ها
          El({
            element: "div",
            className: "w-full flex flex-col gap-3 mt-4",
            children: [
              // دکمه تایید
              El({
                element: "button",
                className:
                  "w-full py-2 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition",
                textContent: "YView Ordered",
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      router.navigate("/order");
                      modal.remove();
                    },
                  },
                ],
              }),
              // دکمه لغو
              El({
                element: "button",
                className:
                  "w-full py-2 rounded-md bg-gray-300 text-gray-700 font-medium hover:bg-gray-400 transition",
                textContent: "View E-Receipt",
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      modal.remove(); // بستن مودال
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

  // افزودن مودال به صفحه
  document.body.appendChild(modal);
};
