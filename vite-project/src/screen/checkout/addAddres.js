import { El } from "../../script";
import { address } from "./addres";

export const openAddressModal = function () {
  // Create the modal overlay
  const modalOverlay = El({
    element: "div",
    className:
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
    children: [
      // Modal content
      El({
        element: "div",
        className:
          "bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg space-y-4",
        children: [
          // Title
          El({
            element: "h3",
            className: "text-lg font-bold text-gray-700",
            innerText: "Add New Address",
          }),
          // Input: Address Title
          El({
            element: "input",
            className:
              "w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            restAttrs: {
              type: "text",
              placeholder: "Address Title (e.g., Home, Office)",
              id: "addressTitleInput",
            },
          }),
          // Input: Address Details
          El({
            element: "textarea",
            className:
              "w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none",
            restAttrs: {
              placeholder: "Address Details (e.g., 123 Main Street, City)",
              id: "addressDetailsInput",
              rows: 3,
            },
          }),
          // Buttons
          El({
            element: "div",
            className: "flex justify-end gap-4",
            children: [
              // Cancel Button
              El({
                element: "button",
                className:
                  "px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300",
                innerText: "Cancel",
                eventListener: [
                  {
                    event: "click",
                    callback: () => document.body.removeChild(modalOverlay),
                  },
                ],
              }),
              // Save Button
              El({
                element: "button",
                className:
                  "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",
                innerText: "Save",
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      // Get values from inputs
                      const title =
                        document.getElementById("addressTitleInput").value;
                      const details = document.getElementById(
                        "addressDetailsInput"
                      ).value;

                      if (!title || !details) {
                        return;
                      }

                      document.body.removeChild(modalOverlay);
                    },
                  },
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  document.body.appendChild(modalOverlay);
};
