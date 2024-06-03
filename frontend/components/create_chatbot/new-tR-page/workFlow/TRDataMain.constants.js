import dynamic from "next/dynamic";
const HomeIcon = dynamic(() => import("@heroicons/react/24/solid/HomeIcon"));
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

const ServerStackIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ServerStackIcon")
);
const Square2StackIcon = dynamic(() =>
  import("@heroicons/react/24/solid/Square2StackIcon")
);
const ArrowUturnLeftIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ArrowUturnLeftIcon")
);

export const triggers = [
  { label: "First visit on site", icon: HomeIcon, id: 1, handle: 1 },
  {
    label: "Visitor click on chatbot",
    icon: ChatBubbleLeftIcon,
    id: 2,
    nodeHandles: 1,
    decisiontrigger: "false",
    howItsWorksText: "",
  },
];
export const actions = [
  {
    label: "Send a chat",
    icon: ChatBubbleLeftRightIcon,
    id: 1,
    nodeHandles: 2,
    decisiontrigger: "false",
    howItsWorksText:
      "A chat message will be sent to the visitor after the last action occurs or is initiated.",
  },
  {
    label: "Ask a question",
    icon: QuestionMarkCircleIcon,
    id: 2,
    nodeHandles: 3,
    decisiontrigger: "true",
    howItsWorksText: "The visitor will be asked a question.",
  },
  {
    label: "Decision (Buttons)",
    icon: ServerStackIcon,
    id: 3,
    nodeHandles: 3,
    decisiontrigger: "true",
    howItsWorksText:
      "The visitor will be asked to choose the answer from one of the buttons. Note that the buttons won't disappear after they were clicked so the visitor can return to them at any moment during the conversation.",
  },
  {
    label: "Decision (Card Messages)",
    icon: Square2StackIcon,
    id: 4,
    nodeHandles: 3,
    decisiontrigger: "true",
    howItsWorksText:
      "Send out rich messages with texts, images, and buttons. The visitor will be asked to select the answer from one of the buttons. Note that the buttons won't disappear after they were clicked so the visitor can return to them at any moment during the conversation.",
  },
  {
    label: "Forms",
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
