import Navigo from "navigo";
import { layout } from "../layout";
import { home } from "../screen/home";
import { products } from "../screen/products";
export const root = document.getElementById("app");
export const router = new Navigo("/");
export const app = () => {
  router
    .on("/", () => layout(home()))
    // .on("/onBoarding", onBoarding)
    .on("/products", () => layout(products()))
    .resolve();
};
