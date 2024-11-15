import { root, router } from "../router/index.routes";
import { El } from "../script";
import { getStorage, render } from "../utils/render";

export const layout = (children) => {
  root.innerHTML = "";
  const header = El({
    element: "header",
    children: [
      El({
        element: "button",
        children: ["products"],
        eventListener: [
          {
            event: "click",
            callBack: () => router.navigate("/products"),
          },
        ],
      }),
      El({
        element: "a",
        children: ["home"],
        href: "/",
        dataset: {
          navigo: "",
        },
      }),
    ],
  });
  const footer = El({
    element: "footer",
    children: ["footer"],
  });
  if (getStorage("visitedFirstTime")) render(header, children(), footer);
  else {
    router.navigate("/onboarding");
  }
};
