import dynamic from "next/dynamic";
const HomeIcon = dynamic(() => import("@heroicons/react/24/solid/HomeIcon"));
const ShareIcon = dynamic(() => import("@heroicons/react/24/solid/ShareIcon"));
const ChatBubbleOvalLeftEllipsisIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ChatBubbleOvalLeftEllipsisIcon")
);
const IdentificationIcon = dynamic(() =>
  import("@heroicons/react/24/solid/IdentificationIcon")
);
const ChatBubbleLeftIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ChatBubbleLeftIcon")
);
const ChatBubbleLeftRightIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ChatBubbleLeftRightIcon")
);
const QuestionMarkCircleIcon = dynamic(() =>
  import("@heroicons/react/24/solid/QuestionMarkCircleIcon")
);
const ClockIcon = dynamic(() => import("@heroicons/react/24/solid/ClockIcon"));
const LinkIcon = dynamic(() => import("@heroicons/react/24/solid/LinkIcon"));
const NoSymbolIcon = dynamic(() =>
  import("@heroicons/react/24/solid/NoSymbolIcon")
);

const ServerStackIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ServerStackIcon")
);
const Square2StackIcon = dynamic(() =>
  import("@heroicons/react/24/solid/Square2StackIcon")
);
const ArrowUturnLeftIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ArrowUturnLeftIcon")
);
const ShieldCheckIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ShieldCheckIcon")
);

export const triggers = [
  {
    label: "First visit on site",
    icon: HomeIcon,
    id: 1,
    decisiontrigger: "false",
    nodeHandles: 1,
    howItsWorksText:
      "Will be triggered on a visitor's first visit on your website. Works only once for every visitor.",
  },
  {
    label: "Visitor click on chatbot",
    icon: ChatBubbleLeftIcon,
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
    icon: ChatBubbleLeftRightIcon,
    id: 1,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText:
      "A chat message will be sent to the visitor after the last action occurs or is initiated.",
  },
  {
    label: "Questionable Trigger",
    icon: QuestionMarkCircleIcon,
    id: 2,
    nodeHandles: 3,
    decisiontrigger: "true",
    howItsWorksText: "The visitor will be asked a question.",
  },
  {
    label: "Decision (Buttons)",
    icon: ShareIcon,
    id: 3,
    nodeHandles: 4,
    decisiontrigger: "true",
    howItsWorksText:
      "The visitor will be asked to choose the answer from one of the buttons. Note that the buttons won't disappear after they were clicked so the visitor can return to them at any moment during the conversation.",
  },
  {
    label: "Card Slider",
    icon: Square2StackIcon,
    id: 4,
    nodeHandles: 3,
    decisiontrigger: "true",
    howItsWorksText:
      "Send out rich messages with texts, images, and buttons. The visitor will be asked to select the answer from one of the buttons. Note that the buttons won't disappear after they were clicked so the visitor can return to them at any moment during the conversation.",
  },
  {
    label: "Custom Forms",
    icon: IdentificationIcon,
    id: 6,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText:
      "Sequential Form Presentation Based on User Actions. Display for User Input Collection.",
  },
  {
    label: "Live Chat",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    id: 7,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText:
      "Live chat triggers activate the live chat process when users seek assistance.",
  },

  {
    label: "Delay",
    icon: ClockIcon,
    id: 8,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText: "Flow will be delayed for a specified amount of time.",
  },
  {
    label: "Enable text input",
    icon: ShieldCheckIcon,
    id: 9,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText: `When you add this node, you will allow visitors to type while a Flow is running. \n To add this node, you must first add the  Disable text input” node.`,
  },
  {
    label: "Disable text input",
    icon: NoSymbolIcon,
    id: 10,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText: `When you add this node, your visitors won’t be able to type anything in the Flow while a Flow is running. \n The possibility to type will be disabled until you enable it again using the “Enable text input ” node or until the current flow ends`,
  },
];
export const conditions = [
  {
    label: "Returning visitor",
    icon: ArrowUturnLeftIcon,
    id: 1,
    nodeHandles: 4,
    decisiontrigger: "false",
    howItsWorksText:
      "You can filter your visitors for those who are returning to your site and for those who are visiting your site for the first time.",
  },
  {
    label: "Current URL",
    icon: LinkIcon,
    id: 2,
    nodeHandles: 4,
    decisiontrigger: "false",
    howItsWorksText:
      "This condition lets you determine Flow behavior based on the page your visitor lands on.",
  },
];
