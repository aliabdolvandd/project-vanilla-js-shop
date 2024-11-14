import { El } from "../../../script";



const container = El({
    element: "div",
    className: "flex flex-col h-screen w-auto bg-cover bg-center text-white p-4",
    restAttrs: {
      style: "background-image:linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0.5)), url('images/wallpaper.png');"
    }
  });
  
 
  const overlay = El({
    element: "div",
    className: "flex flex-col h-auto w-auto  bg-opacity-100 mt-80 "
  });
  
 
  const title = El({
    element: "h1",
    children: ["Welcome to 👋"],
    className: "text-3xl font-semibold mb-2"
  });
  
 
  const shopName = El({
    element: "h2",
    children: ["Shoea"],
    className: "text-5xl font-bold text-left"
  });
  
 
  const description = El({
    element: "p",
    children: ["The best sneakers & shoes e-commerce app of the century for your fashion needs!"],
    className: "text-left mt-2 text-base max-w-xs"
  });
  
 
  overlay.append(title, shopName, description);
  container.append(overlay);
  
 
 
  
  export const wellcome = container;