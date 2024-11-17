import { root, router } from "../router/index.routes";
import { El } from "../script";
import { getStorage, render } from "../utils/render";
import { createFooter } from "./footer";

export const layout = async (children) => {
  root.innerHTML = "";
  // const header = El({
  //   element: "header",
  //   children: [
  //     El({
  //       element: "button",
  //       children: ["products"],
  //       eventListener: [
  //         {
  //           event: "click",
  //           callBack: () => router.navigate("/products"),
  //         },
  //       ],
  //     }),
  //     El({
  //       element: "a",
  //       children: ["home"],
  //       href: "/",
  //       dataset: {
  //         navigo: "",
  //       },
  //     }),
  //   ],
  // });
  const footerEl = El({
    element: "footer",
    className: "fixed bottom-0 left-0 w-full",
    children: [createFooter()],
  });
  if (getStorage("visitedFirstTime")) render(await children(), footerEl);
  else {
    router.navigate("/onboarding");
  }
};
