import React, { useState } from "react";

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState(
    "linear-gradient(to top, rgba(0, 200, 83, 0), #3b71ca)"
  );

  const themes = [
    "linear-gradient(to top, rgba(0, 200, 83, 0), #3b71ca)",
    "linear-gradient(to top, rgba(0, 200, 83, 0), rgb(104 197 0))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(11,100%,42.2%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(252,13%,46%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(39,100%,68%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(200,90%,30%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(337,85%,66%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(56,98%,58%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(212,100%,61%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(330,90%,67%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(46,91%,72%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(295,67%,55%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(0,94%,57%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(218,82%,60%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(33,84%,64%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(164,72%,52%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(15,76%,58%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(25,88%,64%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(340,73%,64%,1))",
    "linear-gradient(to top, rgba(0, 200, 83, 0), hsla(120,73%,74%,1))",
  ];

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Select your personalized theme
      </h3>
      <div className="flex items-center border-b border-teal-500 py-2"></div>
      <div class="flex items-center w-full max-w-xs p-4 mb-8 mt-8 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ">
        <div
          style={{ background: selectedTheme }}
          class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-green-500 bg-green-100 rounded-lg dark:text-green-200"
        >
          <svg
            class="w-7 h-7"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="transparent"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-md font-semibold">Selected Theme</div>
      </div>
      <div className="grid grid-cols-5 gap-4 my-2">
        {themes.map((elem, index) => (
          <div
            key={index}
            className={`bg-gray-200 p-4 rounded-full w-16 h-16 cursor-pointer transition-transform transform hover:scale-110 ${
              selectedTheme === elem ? "border border-black" : ""
            }`}
            style={{ background: elem }}
            onClick={() => handleThemeSelect(elem)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
