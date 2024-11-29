import { El } from "../../script";
import { svgs } from "../../svgs";
import { render, setStorage } from "../../utils/render";
import { validateEmail, validatePassword } from "./validateE";
import { postRequest } from "../../api/post";
import { router } from "../../router/index.routes";

const formContainer = El({
  element: "div",
  className:
    "flex flex-col items-center justify-center min-h-screen bg-gray-50",
});

const logo = El({
  element: "div",
  children: [
    El({
      element: "span",
      className: "text-6xl font-bold text-black",
      innerHTML: svgs.Logo,
    }),
  ],
  className: "mb-8",
});

const form = El({
  element: "form",
  className: "w-full max-w-xs",
});

const title = El({
  element: "h2",
  innerText: " Login to your account",
  className: "text-2xl font-semibold text-center text-gray-800 mb-4",
});

const emailContainer = El({
  element: "div",
  className: "relative w-full mb-4",
});

const emailInput = El({
  element: "input",
  className:
    "w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black",
  type: "email",
  placeholder: "Email",
});

const emailIcon = El({
  element: "span",
  className: "absolute inset-y-0 left-3 flex items-center text-gray-400",
  innerHTML: svgs.Email,
});

emailContainer.append(emailInput, emailIcon);

const passwordContainer = El({
  element: "div",
  className: "relative w-full mb-4",
});

const passwordInput = El({
  element: "input",
  className:
    "w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black",
  type: "password",
  placeholder: " Password",
});

const passwordIcon = El({
  element: "span",
  className: "absolute inset-y-0 left-3 flex items-center text-gray-400",
  innerHTML: svgs.Lock,
});

passwordContainer.append(passwordInput, passwordIcon);

const rememberMeContainer = El({
  element: "div",
  className: "flex items-center mb-6 justify-center",
});

const rememberMeCheckbox = El({
  element: "input",
  type: "checkbox",
  className: "mr-2",
});

const rememberMeLabel = El({
  element: "label",
  innerText: " Remember me",
  className: "text-gray-600",
});

rememberMeContainer.append(rememberMeCheckbox, rememberMeLabel);

const submitButton = El({
  element: "button",
  type: "submit",
  innerText: "Sing in",
  className:
    "w-full py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition",
});

form.append(
  title,
  emailContainer,
  passwordContainer,
  rememberMeContainer,
  submitButton
);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!validateEmail(email)) {
    alert("Please enter a valid email.");
    return;
  }

  if (!validatePassword(password)) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    const result = await postRequest("/users", {
      email,
      password,
      cart: [],
      orders: [],
      wishlist: [],
    });
    setStorage("user", result);
    router.navigate("/");
  } catch (error) {
    console.log(error);
  }
});

formContainer.append(logo, form);
export const login = () => {
  console.log();

  return render(formContainer);
};
