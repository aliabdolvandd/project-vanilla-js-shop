import Navigo from "navigo";
import { layout } from "../layout";
import { home } from "../screen/home";
import { products } from "../screen/products";
import { login } from "../layout/login";
import { loading, loadingPage } from "../layout/onboarding/loading";
import { render } from "../utils/render";
import { cart } from "../screen/cart";
export const root = document.getElementById("app");
export const router = new Navigo("/");
export const app = () => {
  router
    .on("/", async () => await layout(home))
    // .on("/products", () => layout(products()))
    .on("/login", (params) => login(params))
    .on("/onboarding", (params) => loadingPage(params))
    .on("/cart", async (params) => await layout(cart))
    .resolve();
};
