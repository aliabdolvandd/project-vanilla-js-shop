import { El } from "../../../script";
import { svgs } from "../../../svgs";

 const logoElement = El({
    element: "div",
    children: [
      El({
        element: "img",
        restAttrs: { src: "/images/logo.png", alt: "Logo" },
        className: "w-8 h-8"
      }),
      El({
        element: "span",
        children: ["Shoea"],
        className: "text-xl font-semibold text-gray-800"
      }),
    ],
    className: "flex items-center space-x-2",
  });
  
  const loadingElement = El({
    element: "div",
    children: [
      El({
        element: "div",
        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900",
      }),
    ],
    className: "mt-8",
  });
  
  export const loading = El({
    element: "div",
    children: [logoElement, loadingElement],
    className: "flex flex-col items-center justify-center h-screen",
  });