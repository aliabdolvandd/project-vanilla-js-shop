import Navigo from "navigo";
import { layout } from "../layout";
import { home } from "../screen/home";
import { products } from "../screen/products";
import { login } from "../layout/login";
import { loading, loadingPage } from "../layout/onboarding/loading";
import { render } from "../utils/render";
export const root = document.getElementById("app");
export const router = new Navigo("/");
export const app = () => {
  router
    .on("/", () => layout(home))
    // .on("/products", () => layout(products()))
    .on("/login", (params) => login(params))
    .on("/onboarding", (params) => loadingPage(params))
    .resolve();
};
