import Navigo from "navigo";
import { layout } from "../layout";
import { home } from "../screen/home";
import { products } from "../screen/products";
import { login } from "../layout/login";
import { loading, loadingPage } from "../layout/onboarding/loading";
import {
  render,
  renderCartPage,
  renderDetaile,
  renderPopular,
  renderProductFilter,
  renderWishList,
} from "../utils/render";
import { cartPage } from "../screen/cart";
import { showPopular } from "../screen/home/popular";
import { ordersPage } from "../screen/order";
// import { filterHeader } from "../screen/home/brandFilter";
// import { detail } from "../screen/detailePage";

export const root = document.getElementById("app");
export const router = new Navigo("/");
export const app = () => {
  router
    .on("/", async () => await layout(() => home()))
    .on(
      "/products/:brand",
      async (params) => await layout(() => renderProductFilter(params))
    )
    .on(
      "/product/:id",
      async (params) => await layout(() => renderDetaile(params))
    )
    .on(
      "/wishlist",
      async (params) => await layout(() => renderWishList(params))
    )
    .on("/order", async () => await layout(() => ordersPage()))
    .on("/popular", async () => await layout(() => renderPopular()))
    .on("/login", (params) => login(params))
    .on("/onboarding", (params) => loadingPage(params))
    .on("/cart", async (params) => await layout(renderCartPage))

    .resolve();
};
