import dynamic from "next/dynamic";
const HomeIcon = dynamic(() => import("@heroicons/react/24/solid/HomeIcon"));
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

const ServerStackIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ServerStackIcon")
);
const Square2StackIcon = dynamic(() =>
  import("@heroicons/react/24/solid/Square2StackIcon")
);

export const triggers = [
  { label: "First visit on site", icon: HomeIcon, id: 1, handle: 1 },
  {
    label: "Visitor click on chatbot",
    icon: ChatBubbleLeftIcon,
    id: 2,
    nodeHandles: 1,
    decisionTrigger: false,
  },
];
export const actions = [
  {
    label: "Send a chat",
    icon: ChatBubbleLeftRightIcon,
    id: 1,
    nodeHandles: 2,
    decisionTrigger: false,
  },
  {
    label: "Ask a question",
    icon: QuestionMarkCircleIcon,
    id: 2,
    nodeHandles: 3,
    decisionTrigger: true,
  },
  {
    label: "Decision (Buttons)",
    icon: ServerStackIcon,
    id: 3,
    nodeHandles: 3,
    decisionTrigger: true,
  },
  {
    label: "Decision (Card Messages)",
    icon: Square2StackIcon,
    id: 4,
    nodeHandles: 3,
    decisionTrigger: true,
  },
  {
    label: "Delay",
    icon: ClockIcon,
    id: 6,
    nodeHandles: 2,
    decisionTrigger: false,
  },
  {
    label: "Forms",
    icon: IdentificationIcon,
    id: 7,
    nodeHandles: 2,
    decisionTrigger: false,
  },
];
export const conditions = [
  {
    label: "if/else",
    icon: HomeIcon,
    id: 1,
    nodeHandles: 4,
    decisionTrigger: true,
  },
];
