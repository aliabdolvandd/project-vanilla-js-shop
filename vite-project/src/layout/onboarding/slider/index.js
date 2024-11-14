import { El } from "../../../script";
  

const pages = [
    {
      imageSrc: "/images/Wallpaperone.png",
      altText: "Image 1",
      message: "We provide high quality products just for you ",
    },
    {
      imageSrc: "/images/Wallpaper2.png",
      altText: "Image 2",
      message: "Your satisfaction is our number one periority",
    },
    {
      imageSrc: "/images/Wallpaper3.png",
      altText: "Image 3",
      message: " Lets fulfill your fashion needs with shoearight now!",
    },
  ];
  
  let currentPageIndex = 0; 
  
 
  function createPage(pageData) {
    const { imageSrc, altText, message } = pageData;
  
    const container = El({
      element: "div",
      className: "flex flex-col items-center justify-between h-screen  p-4",
    });
  
   
    const imageWrapper = El({
      element: "div",
      className: "w-full flex justify-center mb-4",
      children: [
        El({
          element: "img",
          className: "rounded-lg shadow-lg max-h-96",
          src: imageSrc,
          alt: altText,
        }),
      ],
    });
  
    
    const textContent = El({
      element: "div",
      className: "text-center px-4",
      children: [
        El({
          element: "h2",
          className: "text-2xl font-medium text-gray-800",
          innerText: message,
        }),
      ],
    });
  
    
    const paginationDots = pages.map((_, index) =>
      El({
        element: "div",
        className: `h-1 w-8 rounded-full ${
          index === currentPageIndex ? "bg-gray-800" : "bg-gray-300"
        }`,
        
      })
    );
  
    const pagination = El({
      element: "div",
      className: "flex items-center gap-1 mt-4",
      children: paginationDots,
    });
  
   
    const buttonText = currentPageIndex === pages.length - 1 ? "Get Started" : "Next";
    const nextButton = El({
      element: "button",
      className: "mt-6  h-10 w-72 bg-gray-800 text-white rounded-full shadow-md",
      innerText: buttonText,
      eventListener: [
        {
          event: "click",
          callback: () => {
            if (currentPageIndex < pages.length - 1) {
              currentPageIndex++;
              renderPage(); 
            }
            //  else {
            //   window.location.href = "/login"; 
            // }
          },
        },
      ],
    });
  
    
    container.append(imageWrapper, textContent, pagination, nextButton);
  
    return container;
  }
  
  
  export function renderPage() {
    const app = document.getElementById("app");
    app.innerHTML = ""; 
    const page = createPage(pages[currentPageIndex]);
    app.append(page);
  }
  
  
  renderPage();