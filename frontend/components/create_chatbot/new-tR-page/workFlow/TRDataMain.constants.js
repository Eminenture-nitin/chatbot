export const triggers = [
  {
    label: "First visit on site",
    iconName: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-6 w-7 h-7 text-center align-middle"
      >
        <path stroke="transparent" d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path stroke="transparent" d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>`,
    id: 1,
    decisiontrigger: "false",
    nodeHandles: 1,
    howItsWorksText:
      "Will be triggered on a visitor's first visit on your website. Works only once for every visitor.",
  },
  {
    label: "Visitor click on chatbot",
    iconName: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-6 w-7 h-7 text-center align-middle"
      >
        <path stroke="transparent" d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
        <path stroke="transparent" d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
      </svg>`,
    id: 2,
    nodeHandles: 1,
    decisiontrigger: "false",
    howItsWorksText:
      "Will be triggered when a visitor clicks on the widget’s chat icon.",
  },
];
export const actions = [
  {
    label: "Send a response",
    iconName: `<svg xmlns="http://www.w3.org/2000/svg"   fill="transparent"
        stroke="white"
        className="size-6 w-7 h-7 text-center align-middle" viewBox="0 0 24 24" stroke-width="1.5" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>
`,
    id: 1,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText:
      "A chat message will be sent to the visitor after the last action occurs or is initiated.",
  },
  {
    label: "Questionable Trigger",
    iconName: `<svg xmlns="http://www.w3.org/2000/svg"   fill="transparent"
        stroke="white"
        className="size-6 w-7 h-7 text-center align-middle" viewBox="0 0 24 24" stroke-width="1.5"  >
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
</svg>
`,
    id: 2,
    nodeHandles: 3,
    decisiontrigger: "true",
    howItsWorksText: "The visitor will be asked a question.",
  },
  {
    label: "Decision (Buttons)",
    iconName: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-6 w-7 h-7 text-center align-middle rotate-90"
      >
        <path stroke="transparent"
          fillRule="evenodd"
          d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
          clip-rule="evenodd"
        />
      </svg>`,
    id: 3,
    nodeHandles: 4,
    decisiontrigger: "true",
    howItsWorksText:
      "The visitor will be asked to choose the answer from one of the buttons. Note that the buttons won't disappear after they were clicked so the visitor can return to them at any moment during the conversation.",
  },
  {
    label: "Card Slider",
    iconName: `<svg xmlns="http://www.w3.org/2000/svg"   fill="transparent"
        stroke="white"
        className="size-6 w-7 h-7 text-center align-middle" viewBox="0 0 24 24" stroke-width="1.5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
</svg>
`,
    id: 4,
    nodeHandles: 3,
    decisiontrigger: "true",
    howItsWorksText:
      "Send out rich messages with texts, images, and buttons. The visitor will be asked to select the answer from one of the buttons. Note that the buttons won't disappear after they were clicked so the visitor can return to them at any moment during the conversation.",
  },
  {
    label: "Custom Forms",
    iconName: `<svg xmlns="http://www.w3.org/2000/svg"   fill="transparent"
        stroke="white"
        className="size-6 w-7 h-7 text-center align-middle" viewBox="0 0 24 24" stroke-width="1.5"  >
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
</svg>
`,
    id: 6,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText:
      "Sequential Form Presentation Based on User Actions. Display for User Input Collection.",
  },
  {
    label: "Live Chat",
    iconName: `<svg xmlns="http://www.w3.org/2000/svg"   fill="transparent"
        stroke="white"
        className="size-6 w-7 h-7 text-center align-middle" viewBox="0 0 24 24" stroke-width="1.5" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg>
`,
    id: 7,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText:
      "Live chat triggers activate the live chat process when users seek assistance.",
  },

  {
    label: "Delay",
    iconName: `<svg
        className="size-6 w-7 h-7 text-center align-middle"
        xmlns="http://www.w3.org/2000/svg"
        fill="transparent"
        stroke="white"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>`,
    id: 8,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText: "Flow will be delayed for a specified amount of time.",
  },
  {
    label: "Enable text input",
    iconName: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        fill="transparent"
        stroke="white"
        className="size-6 w-7 h-7 text-center align-middle"
        
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>`,
    id: 9,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText: `When you add this node, you will allow visitors to type while a Flow is running. \n To add this node, you must first add the  Disable text input” node.`,
  },
  {
    label: "Disable text input",
    iconName: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-6 w-7 h-7 text-center align-middle"
      >
        <path stroke="transparent"
          fillRule="evenodd"
          d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z"
          clip-rule="evenodd"
        />
      </svg>`,
    id: 10,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText: `When you add this node, your visitors won’t be able to type anything in the Flow while a Flow is running. \n The possibility to type will be disabled until you enable it again using the “Enable text input ” node or until the current flow ends`,
  },
];
export const conditions = [
  {
    label: "Returning visitor",
    iconName: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-6 w-7 h-7 text-center align-middle"
      >
        <path stroke="transparent"
          fillRule="evenodd"
          d="M14.47 2.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H9a5.25 5.25 0 1 0 0 10.5h3a.75.75 0 0 1 0 1.5H9a6.75 6.75 0 0 1 0-13.5h10.19l-4.72-4.72a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>`,
    id: 1,
    nodeHandles: 4,
    decisiontrigger: "false",
    howItsWorksText:
      "You can filter your visitors for those who are returning to your site and for those who are visiting your site for the first time.",
  },
  {
    label: "Current URL",
    iconName: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-6 w-7 h-7 text-center align-middle"
      >
        <path stroke="transparent"
          fillRule="evenodd"
          d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
          clipRule="evenodd"
        />
      </svg>`,
    id: 2,
    nodeHandles: 4,
    decisiontrigger: "false",
    howItsWorksText:
      "This condition lets you determine Flow behavior based on the page your visitor lands on.",
  },
];
