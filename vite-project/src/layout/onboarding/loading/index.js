import { router } from "../../../router/index.routes";
import { El } from "../../../script";
import { svgs } from "../../../svgs";
import { render } from "../../../utils/render";
import { renderPage } from "../slider";
import { wellcome } from "../wellcome";

const logoElement = El({
  element: "div",
  children: [
    El({
      element: "img",
      restAttrs: { src: "/images/logo.png", alt: "Logo" },
      className: "w-8 h-8",
    }),
    El({
      element: "span",
      children: ["Shoea"],
      className: "text-3xl font-bold text-gray-800",
    }),
  ],
  className: "flex items-center space-x-2 mt-36",
});

const loadingElement = El({
  element: "div",
  children: [
    El({
      element: "div",
      className:
        "animate-spin rounded-full h-8 w-8 border-b-4 border-gray-900 mt-60",
    }),
  ],
  className: "mt-8",
});

export const loading = El({
  element: "div",
  children: [logoElement, loadingElement],
  className: "flex flex-col items-center justify-center h-screen",
});

export const loadingPage = () => {
  render(loading);
  setTimeout(() => {
    render(wellcome);
    setTimeout(() => {
      renderPage();
    }, 3000);
  }, 3000);
};
