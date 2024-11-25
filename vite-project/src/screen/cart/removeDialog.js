// export const showRemoveDialog = (product, cartProducts) => {
//   const dialog = El({
//     element: "div",
//     className:
//       "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
//     children: [
//       El({
//         element: "div",
//         className: "bg-white p-6 rounded-lg w-96 shadow-lg flex flex-col gap-4",
//         children: [
//           El({
//             element: "h2",
//             className: "text-lg font-bold text-gray-800",
//             textContent: "Remove From Cart?",
//           }),
//           El({
//             element: "div",
//             className: "flex gap-4 items-center",
//             children: [
//               El({
//                 element: "img",
//                 className: "w-20 h-20 object-cover rounded-lg",
//                 restAttrs: { src: product.image, alt: product.title },
//               }),
//               El({
//                 element: "div",
//                 className: "flex flex-col gap-1",
//                 children: [
//                   El({
//                     element: "h3",
//                     className: "font-bold text-gray-800",
//                     textContent: product.title,
//                   }),
//                   El({
//                     element: "p",
//                     className: "text-sm text-gray-500",
//                     textContent: `Color: ${product.color} | Size: ${product.size}`,
//                   }),
//                   El({
//                     element: "p",
//                     className: "font-bold text-gray-700",
//                     textContent: `$${product.price}`,
//                   }),
//                 ],
//               }),
//             ],
//           }),
//           El({
//             element: "div",
//             className: "flex justify-between gap-4 mt-4",
//             children: [
//               El({
//                 element: "button",
//                 className:
//                   "w-full py-2 bg-gray-200 text-gray-800 rounded-lg font-bold",
//                 textContent: "Cancel",
//                 eventListener: [
//                   {
//                     event: "click",
//                     callback: () => {
//                       dialog.remove();
//                     },
//                   },
//                 ],
//               }),
//               El({
//                 element: "button",
//                 className:
//                   "w-full py-2 bg-red-500 text-white rounded-lg font-bold",
//                 textContent: "Yes, Remove",
//                 eventListener: [
//                   {
//                     event: "click",
//                     callback: async () => {
//                       const userId = getStorage("user").id;
//                       const productIndex = cartProducts.findIndex(
//                         (item) => item.id === product.id
//                       );
//                       if (productIndex > -1) {
//                         cartProducts.splice(productIndex, 1);
//                         await patchRequest(`/users/${userId}`, {
//                           cart: cartProducts,
//                         });
//                         renderCartPage();
//                       }
//                       dialog.remove();
//                     },
//                   },
//                 ],
//               }),
//             ],
//           }),
//         ],
//       }),
//     ],
//   });

//   document.body.appendChild(dialog);
// };
