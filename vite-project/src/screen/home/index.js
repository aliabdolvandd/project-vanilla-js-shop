import { El } from "../../script";
import { setStorage } from "../../utils/render";

export const home = () => {
  setStorage("visitedFirstTime", true);
  return El({
    element: "div",
    className: "flex-1",
    children: ["home"],
  });
};
