import { root, router } from "../router/index.routes";
import { El } from "../script";

export const layout = (children) => {
  root.innerHTML = "";
  const header = El({
    element: "header",
    children: [
      El({
        element: "button",
        children: ["products"],
        eventListener: {
          event: "click",
          callBack: () => router.navigate("/products"),
        },
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
  root.append(header, children, footer);
};
