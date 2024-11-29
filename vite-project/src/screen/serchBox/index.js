import { data } from "autoprefixer";
import { getData } from "../../api/getApi";
import { El } from "../../script";
import { svgs } from "../../svgs";
import { router } from "../../router/index.routes";
import { render, renderDetaile } from "../../utils/render";
// import { renderSearch } from "../../utils/render";

let searchHistory = [];

const addSearchToHistory = (searchTerm) => {
  if (!searchHistory.includes(searchTerm)) {
    searchHistory.push(searchTerm);

    const historyContainer = document.querySelector("#searchHistory");
    const historyItem = El({
      element: "li",
      className: "text-gray-600",
      innerText: searchTerm,
    });

    historyContainer.append(historyItem);
  }
};
// INPUT SEARCH IN HOME
export const search = () => {
  return El({
    element: "div",
    className:
      "flex items-center px-4 py-2 bg-gray-100 shadow-sm w-[400px] ml-10 mt-2 max-w-sm cursor-pointer",
    children: [
      El({
        element: "span",
        className: "w-5 h-5 text-gray-400 mr-2",
        innerHTML: svgs.search,
      }),
      El({
        element: "input",
        className:
          "flex-grow bg-gray-100 border-none focus:outline-none text-gray-700 text-sm placeholder-gray-400",
        restAttrs: { type: "text", placeholder: "Search" },
      }),
    ],
    eventListener: [
      {
        event: "click",
        callback: () => {
          toggleSearchPage();
        },
      },
    ],
  });
};

const toggleSearchPage = () => {
  const existingSearchPage = document.querySelector("#searchPage");
  if (existingSearchPage) {
    existingSearchPage.remove();
  } else {
    document.body.appendChild(searchPage());
  }
};

export const searchPage = () => {
  return El({
    element: "div",
    id: "searchPage",
    className: "fixed inset-0 bg-white p-4 z-50 overflow-scroll",
    children: [
      // Header
      El({
        element: "div",
        className: "flex items-center justify-between mb-4",
        children: [
          El({
            element: "input",
            id: "searchInput",
            className: "w-full border p-2 rounded-lg",
            restAttrs: { type: "text", placeholder: "Search for products..." },
            eventListener: [
              {
                event: "input",
                callback: (event) => {
                  const searchTerm = event.target.value.toLowerCase();
                  filterProducts(searchTerm);
                },
              },
            ],
          }),
          El({
            element: "button",
            className: "ml-2 text-gray-500",
            innerText: "Close",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  const searchPage = document.querySelector("#searchPage");
                  searchPage.remove();
                },
              },
            ],
          }),
        ],
      }),
      // Search History
      El({
        element: "div",
        className: "space-y-4 mb-6",
        children: [
          El({
            element: "h3",
            innerText: "Search History",
            className: "text-lg font-semibold text-gray-700",
          }),
          El({
            element: "ul",
            id: "searchHistory",
            className: "list-disc pl-4 text-gray-600",
          }),
          El({
            element: "button",
            className: "text-red-500 text-sm mt-2",
            innerText: "Clear History",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  const searchHistory =
                    document.querySelector("#searchHistory");
                  searchHistory.innerHTML = "";
                },
              },
            ],
          }),
        ],
      }),
      // Search Results
      El({
        element: "div",
        id: "searchResults",
        className: "space-y-4",
        innerText: "Search results will appear here...",
      }),
    ],
  });
};
// Products
const renderSingleProduct = async (product) => {
  return El({
    element: "div",
    className:
      "flex items-center justify-between shadow-md rounded-lg p-4 relative ",
    children: [
      El({
        element: "img",
        className: "w-16 h-16 object-cover rounded-lg",
        restAttrs: { src: product.images, alt: product.title },
      }),

      El({
        element: "div",
        className: "flex-1 mx-4",
        children: [
          El({
            element: "h2",
            className: "text-lg font-bold text-gray-900",
            innerText: product.title,
          }),
          El({
            element: "p",
            className: "text-xl font-bold text-gray-800",
            innerText: `$${product.price}`,
          }),
        ],
      }),
    ],
    eventListener: [
      {
        event: "click",
        callback: () => {
          router.navigate(`/product/${product.id}`);
        },
      },
    ],
  });
};

// SEARCH FILTER
const filterProducts = async (searchTerm) => {
  const productList = await getData("/Products");

  const resultsContainer = document.querySelector("#searchResults");
  resultsContainer.innerHTML = "";

  const filteredProducts = productList.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    resultsContainer.innerText = "No products found.";
    return;
  }

  filteredProducts.forEach(async (product) => {
    resultsContainer.append(await renderSingleProduct(product));
  });
  addSearchToHistory(searchTerm);
};
