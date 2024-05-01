let hashedId = "";
const host_URL = `http://localhost:8080`;

function customDehash(hash, secret) {
  const key = new TextEncoder().encode(secret);
  const hashArray = new Uint8Array(
    atob(hash)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const result = [];

  for (let i = 0; i < hashArray.length; i++) {
    result.push(hashArray[i] ^ key[i % key.length]);
  }

  return new TextDecoder().decode(new Uint8Array(result));
}

let Auth = false;
const currentUrl = "";
const parts = currentUrl.split("/");
const id = parts[parts.length - 1];
const userId = customDehash(hashedId, "EMReact");
let isUserRegistered = false;
let wrongEmailCount = 0;

// console.log("userId", userId);

let alertText = "loading";
let responseDataBOT = [
  {
    id: 1,
    responseMsg: "Hello 👋 how can i assist you?",
    attachmentFile: "",
    suggestedTrigger: [
      "Tell me about your services?",
      "Tell me about your company?",
      "What do you offer?",
    ],
    triggerText: [
      "Hi",
      "Hello",
      "hi there",
      "hey",
      "hey there",
      "Can you assist me?",
      "Need help",
    ],
  },
  {
    id: 3,
    responseMsg: "Sure thing, what's your email ID?",
    attachmentFile: "",
    suggestedTrigger: [],
    triggerText: ["Yes, Please connect"],
  },
  {
    id: 3,
    responseMsg:
      "Got it! 😊 How can I assist you today? Feel free to ask me anything.",
    attachmentFile: "",
    suggestedTrigger: [
      "Tell me about your services?",
      "Tell me about your company?",
    ],
    triggerText: ["Opt out of email, chat with the bot."],
  },
  {
    id: 3,
    responseMsg: "Thank you for chatting with us, Have a wonderful day!",
    attachmentFile: "",
    suggestedTrigger: [
      "Tell me about your services?",
      "Tell me about your company?",
    ],
    triggerText: ["end this conversation"],
  },
  {
    id: 3,
    responseMsg:
      "You're welcome! If you have any more questions or need further assistance, feel free to ask. We're here to help!",
    triggerText: [
      "Thank you",
      "Thanks for the information!",
      "thanks",
      "thankyou",
    ],
  },
  {
    id: 10,
    responseMsg: "Okay!",
    attachmentFile: "",
    suggestedTrigger: [
      "Tell me about your services?",
      "Tell me about your company?",
    ],
    triggerText: ["Not Yet", "No"],
  },
  {
    id: 10,
    responseMsg: "👍",
    triggerText: ["okay", "yes", "hmn"],
  },
  {
    id: 10,
    responseMsg: "⤵",
    triggerText: [
      "Would you like to connect with us?",
      "Would you like us to contact you?",
    ],
    suggestedTrigger: ["Yes, Please connect", "Not Yet"],
  },
  {
    id: 4,
    responseMsg: "Would you like to connect with us?",
    attachmentFile: "",
    suggestedTrigger: ["Yes, Please connect", "Not Yet"],
    triggerText: [
      "chat",
      "live chat",
      "live",
      "chat with assistant",
      "assistant",
      "contact",
      "want to connect with person",
      "want to connect live assistant",
      "Want to connect with us?",
      "Live support",
      "Get assistance",
      "Live help",
      "Alternatively, you can reach out to us via live chat.",
      "Need help? Chat",
    ],
  },
];
let mainChatData = [];

const getInitialMsg = async (userId, botId) => {
  fetch(`${host_URL}/preview/get-data/${userId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // console.log("res", res.data);
      res.data.forEach((item) => {
        if (item?.initialResponse == 1) {
          mainChatData.unshift(item);
        } else if (item?.initialResponse == 2) {
          mainChatData.splice(1, 0, item);
        } else if (item?.initialResponse == 3) {
          mainChatData.splice(2, 0, item);
        }
      });
      chattingData();
    })
    .catch((e) => {
      console.log(e);
    });
};
if (userId) {
  const user__id = localStorage.getItem("widget_user_id");
  if (mainChatData?.length == 0) {
    getInitialMsg(userId, user__id);
  }
  if (user__id) {
    const payload = { from: user__id };
    setTimeout(() => {
      getMsg(payload);
    }, 1000);

    setTimeout(() => {
      getParticularUser(user__id);
      socket.emit("addUser", user__id);
    }, 4000);
  }
}
const getAdminData = async (userId) => {
  try {
    let res = await fetch(`${host_URL}/auth/get-widegt-admin-data/${userId}`);
    let data = await res.json();
    setTimeout(() => {
      localStorage.setItem("adminData", JSON.stringify(data.data));
      document.querySelector(
        ".chatbot-container .chat-interface .header"
      ).style.background = data.data.theme;
      const spans = document.querySelectorAll(
        ".chatbot-container .chat-interface .chat-box .trigger span"
      );
      spans.forEach((span) => {
        span.style.background = data.data.theme;
        span.style.color = "white";
      });
      const resIconMain = document.querySelectorAll(
        ".chatbot-container .chat-interface .chat-box .response .sbfbt2SpecialBot"
      );
      resIconMain.forEach((span) => {
        span.style.background = data.data.theme;
      });
      document.querySelector(
        ".chatbot-container .submit-btn"
      ).style.background = data.data.theme;
      document.querySelector(
        ".chatbot-container .chatbot-icon"
      ).style.background = data.data.theme;
    }, 100);
  } catch (e) {
    console.log(e);
  }
};

if (userId) {
  setTimeout(() => {
    getAdminData(userId);
  }, 1000);
}
const getChatBotData = async (userId) => {
  // console.log(userId, id);
  fetch(`${host_URL}/preview/get-data/${userId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // console.log(res);
      if (res.data) {
        responseDataBOT = [...responseDataBOT, ...res.data];
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
if (userId) {
  getChatBotData(userId);
}
function loadCSSFile() {
  // var currentDomain = window.location.origin;
  // "./styles.css";
  //https://chatbot-widgets-js.vercel.app/styles.css
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://chatbot-widgets-js.vercel.app/styles.css";
  document.head.appendChild(link);
}

function loadScriptFile() {
  let script = document.createElement("script");
  script.src = "https://kit.fontawesome.com/4f2af7deb6.js";
  script.type = "text/javascript";
  document.head.appendChild(script);
}

function loadScriptFileSocket() {
  let script = document.createElement("script");
  script.src = "https://cdn.socket.io/4.5.4/socket.io.min.js";
  script.type = "text/javascript";
  document.head.appendChild(script);
}

loadCSSFile();
loadScriptFile();
//socket io
loadScriptFileSocket();

var socket;
setTimeout(() => {
  socket = io(`${host_URL}`);
  socket.on("connect", () => {
    console.log("connected");
  });
  // localStorage.getItem("widget_user_id");
}, 1000);

let arrivalMsg = {};

// Function to check for changes in arrivalMsg and update mainChatData
function handleEffect() {
  if (arrivalMsg) {
    //console.log("arrivalMsg", arrivalMsg);
    mainChatData.push({
      responseMsg: arrivalMsg.message,
      attachmentFile: arrivalMsg.attachmentFile,
      assiMsgData: arrivalMsg?.assiMsgData,
    });
    chattingData();
  }
}

// Function to set the arrivalMsg and trigger the effect
function setArrivalMsg(newArrivalMsg) {
  if (arrivalMsg.message !== newArrivalMsg.message) {
    arrivalMsg = newArrivalMsg;
    setTimeout(() => {
      handleEffect();
    }, 1000);
  }
}

// Function to simulate listening to the "msg-receive" event
function simulateSocketListener() {
  socket.on("msg-receive", (msg) => {
    //console.log(msg, "arrival c");
    setArrivalMsg(msg);
  });
  chattingData();
}
//append Data
const appendData = () => {
  let chatbotContainer = document.createElement("div");
  chatbotContainer.className = "chatbot-container";

  let ChatBotIconDiv = document.createElement("div");
  ChatBotIconDiv.className = "ChatBotIconDiv";
  let ChatBotIconText = document.createElement("div");
  ChatBotIconText.innerText = "Hi there 👋";
  ChatBotIconText.className = "ChatBotIconText";
  let chatbotIcon = document.createElement("div");
  chatbotIcon.className = "chatbot-icon animate-fade-right ripple-effect";
  chatbotIcon.style.zIndex = "999999999";
  let chatbotIconSymbol = document.createElement("div");
  chatbotIconSymbol.className = "icon-main-embot";
  chatbotIconSymbol.id = "chatbotIconSymbol";
  chatbotIconSymbol.innerHTML = `<svg class="roboIconSvgMain animate-fade-down" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 256 256" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#3762cc" d="M190.03 124.549a2 2 0 0 1-2-2v-22.301c0-14.632-11.904-26.536-26.536-26.536H71.809c-14.632 0-26.536 11.904-26.536 26.536v22.301a2 2 0 0 1-4 0v-22.301c0-16.838 13.698-30.536 30.536-30.536h89.685c16.837 0 30.536 13.698 30.536 30.536v22.301a2 2 0 0 1-2 2z" opacity="1" data-original="#3762cc" class=""></path><path fill="#a4c9ff" d="M37.787 204.89a4.036 4.036 0 0 1-4.037-4.037v-13.822c0-9.353 7.609-16.962 16.962-16.962h139.003c9.353 0 16.962 7.609 16.962 16.962v11.147a4.036 4.036 0 1 1-8.074 0v-11.147c0-4.901-3.987-8.888-8.888-8.888H50.712c-4.901 0-8.888 3.987-8.888 8.888v13.822a4.036 4.036 0 0 1-4.037 4.037z" opacity="1" data-original="#a4c9ff"></path><path fill="#3762cc" d="M37.787 206.89a6.044 6.044 0 0 1-6.037-6.038V187.03c0-10.456 8.506-18.962 18.962-18.962h139.003c10.456 0 18.962 8.506 18.962 18.962v11.147c0 3.329-2.708 6.037-6.038 6.037s-6.037-2.708-6.037-6.037V187.03a6.895 6.895 0 0 0-6.888-6.887H50.712a6.895 6.895 0 0 0-6.888 6.887v13.822a6.044 6.044 0 0 1-6.037 6.038zm12.925-34.821c-8.25 0-14.962 6.712-14.962 14.962v13.822c0 1.124.914 2.038 2.037 2.038s2.037-.914 2.037-2.038v-13.822c0-6.003 4.884-10.887 10.888-10.887h139.003c6.003 0 10.888 4.884 10.888 10.887v11.147a2.04 2.04 0 0 0 2.037 2.037 2.04 2.04 0 0 0 2.038-2.037v-11.147c0-8.25-6.712-14.962-14.962-14.962z" opacity="1" data-original="#3762cc" class=""></path><path fill="#e0ebfc" d="m174.476 158.888-57.049-23.303-57.049 23.303a71.36 71.36 0 0 0 9.409 70.452l.191.249a59.79 59.79 0 0 0 94.898-.001l.191-.249a71.356 71.356 0 0 0 9.409-70.451z" opacity="1" data-original="#e0ebfc" class=""></path><path fill="#f9a7a7" d="M133.632 216.525h-32.41a5.327 5.327 0 0 1-5.327-5.327v-18.392a5.327 5.327 0 0 1 5.327-5.327h32.41a5.327 5.327 0 0 1 5.327 5.327v18.392a5.327 5.327 0 0 1-5.327 5.327z" opacity="1" data-original="#f9a7a7"></path><path fill="#3762cc" d="M117.427 255c-19.09 0-37.421-9.045-49.037-24.195l-.19-.249c-15.812-20.623-19.518-48.375-9.673-72.426a2.002 2.002 0 0 1 1.095-1.094l57.049-23.303a2.001 2.001 0 0 1 1.513 0l57.049 23.303c.497.203.891.597 1.095 1.094 9.845 24.051 6.139 51.803-9.673 72.427l-.19.248C154.849 245.955 136.518 255 117.427 255zm-55.509-94.581c-8.915 22.558-5.323 48.426 9.457 67.704l.19.249C82.429 242.541 99.573 251 117.427 251s34.999-8.459 45.862-22.628l.19-.248c14.78-19.278 18.372-45.146 9.457-67.704l-55.51-22.674z" opacity="1" data-original="#3762cc" class=""></path><path fill="#3762cc" d="M133.632 218.525h-32.41c-4.04 0-7.327-3.287-7.327-7.327v-18.392c0-4.04 3.287-7.327 7.327-7.327h32.41c4.04 0 7.327 3.287 7.327 7.327v18.392c0 4.04-3.287 7.327-7.327 7.327zm-32.409-29.046a3.33 3.33 0 0 0-3.327 3.327v18.392a3.331 3.331 0 0 0 3.327 3.327h32.41a3.33 3.33 0 0 0 3.327-3.327v-18.392a3.33 3.33 0 0 0-3.327-3.327z" opacity="1" data-original="#3762cc" class=""></path><path fill="#4671c6" d="M189.663 142.474h-146.3a8.716 8.716 0 0 1-8.716-8.716v-23.263a8.716 8.716 0 0 1 8.716-8.716h146.3a8.716 8.716 0 0 1 8.716 8.716v23.263a8.717 8.717 0 0 1-8.716 8.716z" opacity="1" data-original="#4671c6"></path><path fill="#3762cc" d="M189.663 144.474h-146.3c-5.909 0-10.716-4.807-10.716-10.716v-23.263c0-5.909 4.807-10.715 10.716-10.715h146.3c5.909 0 10.716 4.807 10.716 10.715v23.263c-.001 5.909-4.808 10.716-10.716 10.716zm-146.3-40.694a6.724 6.724 0 0 0-6.716 6.715v23.263a6.724 6.724 0 0 0 6.716 6.716h146.3a6.724 6.724 0 0 0 6.716-6.716v-23.263a6.723 6.723 0 0 0-6.716-6.715z" opacity="1" data-original="#3762cc" class=""></path><path fill="#e0ebfc" d="M128.986 116.431H105.87v-39.16c0-6.383 5.175-11.558 11.558-11.558s11.558 5.175 11.558 11.558z" opacity="1" data-original="#e0ebfc" class=""></path><path fill="#3762cc" d="M117.427 67.712a2 2 0 0 1-2-2V53.999a2 2 0 0 1 4 0v11.713a2 2 0 0 1-2 2z" opacity="1" data-original="#3762cc" class=""></path><circle cx="117.427" cy="45" r="9" fill="#f9a7a7" opacity="1" data-original="#f9a7a7"></circle><path fill="#3762cc" d="M128.986 118.432h-23.117a2 2 0 0 1-2-2V77.271c0-7.476 6.082-13.558 13.558-13.558s13.559 6.082 13.559 13.558v39.161a2 2 0 0 1-2 2zm-21.117-4h19.117V77.271c0-5.271-4.288-9.558-9.559-9.558s-9.558 4.288-9.558 9.558zM117.427 55.999c-6.065 0-11-4.935-11-11s4.935-11 11-11 11 4.935 11 11-4.934 11-11 11zm0-17.999c-3.859 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z" opacity="1" data-original="#3762cc" class=""></path><path fill="#e0ebfc" d="M154.242 165.085H78.784c-16.815 0-30.446-13.631-30.446-30.446v-25.024c0-16.815 13.631-30.446 30.446-30.446h75.458c16.815 0 30.446 13.631 30.446 30.446v25.024c-.001 16.815-13.632 30.446-30.446 30.446z" opacity="1" data-original="#e0ebfc" class=""></path><path fill="#6bdddd" d="M78.784 150.281c-8.625 0-15.643-7.017-15.643-15.643v-25.024c0-8.625 7.017-15.643 15.643-15.643h75.458c8.625 0 15.643 7.017 15.643 15.643v25.024c0 8.625-7.017 15.643-15.643 15.643z" opacity="1" data-original="#6bdddd" class=""></path><path fill="#3762cc" d="M154.242 167.084H78.784c-17.891 0-32.446-14.555-32.446-32.445v-25.024c0-17.891 14.555-32.446 32.446-32.446h75.458c17.891 0 32.446 14.555 32.446 32.446v25.024c-.001 17.891-14.556 32.445-32.446 32.445zM78.784 81.169c-15.685 0-28.446 12.761-28.446 28.446v25.024c0 15.685 12.761 28.445 28.446 28.445h75.458c15.685 0 28.446-12.761 28.446-28.445v-25.024c0-15.685-12.761-28.446-28.446-28.446z" opacity="1" data-original="#3762cc" class=""></path><path fill="#3762cc" d="M154.242 152.281H78.784c-9.728 0-17.643-7.914-17.643-17.642v-25.024c0-9.728 7.915-17.643 17.643-17.643h75.458c9.729 0 17.643 7.915 17.643 17.643v25.024c0 9.728-7.915 17.642-17.643 17.642zM78.784 95.973c-7.522 0-13.643 6.12-13.643 13.643v25.024c0 7.522 6.12 13.642 13.643 13.642h75.458c7.523 0 13.643-6.12 13.643-13.642v-25.024c0-7.522-6.12-13.643-13.643-13.643z" opacity="1" data-original="#3762cc" class=""></path><path fill="#4671c6" d="M91.387 133.407a7.357 7.357 0 0 1-7.357-7.357v-7.847a7.357 7.357 0 0 1 14.714 0v7.847a7.357 7.357 0 0 1-7.357 7.357zM143.467 133.407a7.357 7.357 0 0 1-7.357-7.357v-7.847a7.357 7.357 0 0 1 14.714 0v7.847a7.357 7.357 0 0 1-7.357 7.357z" opacity="1" data-original="#4671c6"></path><path fill="#a4c9ff" d="M175.255 3h50.269c6.308 0 11.421 5.113 11.421 11.421v34.571c0 6.308-5.114 11.421-11.421 11.421h-32.195L182.292 71.45c-.744.744-2.006.116-1.862-.926l1.398-10.111h-6.572c-6.308 0-11.421-5.113-11.421-11.421V14.421C163.834 8.113 168.947 3 175.255 3z" opacity="1" data-original="#a4c9ff"></path><circle cx="221.209" cy="31.707" r="4.621" fill="#e0ebfc" opacity="1" data-original="#e0ebfc" class=""></circle><circle cx="200.389" cy="31.707" r="4.621" fill="#e0ebfc" opacity="1" data-original="#e0ebfc" class=""></circle><circle cx="179.57" cy="31.707" r="4.621" fill="#e0ebfc" opacity="1" data-original="#e0ebfc" class=""></circle><path fill="#3762cc" d="M181.517 73.772a3.097 3.097 0 0 1-3.068-3.522l1.083-7.837h-4.277c-7.4 0-13.421-6.021-13.421-13.421V14.421c0-7.4 6.021-13.421 13.421-13.421h50.269c7.4 0 13.421 6.021 13.421 13.421v34.571c0 7.4-6.021 13.421-13.421 13.421h-31.367l-10.451 10.451a3.094 3.094 0 0 1-2.189.908zM175.255 5c-5.195 0-9.421 4.227-9.421 9.421v34.571c0 5.195 4.227 9.421 9.421 9.421h6.572a2 2 0 0 1 1.981 2.274l-1.029 7.448 9.136-9.136a2 2 0 0 1 1.414-.586h32.195c5.195 0 9.421-4.226 9.421-9.421V14.421c0-5.195-4.227-9.421-9.421-9.421z" opacity="1" data-original="#3762cc" class=""></path><path fill="#3762cc" d="M221.208 38.328a6.628 6.628 0 0 1-6.621-6.621c0-3.65 2.97-6.621 6.621-6.621s6.621 2.97 6.621 6.621c.001 3.65-2.97 6.621-6.621 6.621zm0-9.242c-1.445 0-2.621 1.176-2.621 2.621s1.176 2.621 2.621 2.621 2.621-1.176 2.621-2.621a2.623 2.623 0 0 0-2.621-2.621zM200.389 38.328a6.629 6.629 0 0 1-6.621-6.621c0-3.65 2.97-6.621 6.621-6.621s6.621 2.97 6.621 6.621c0 3.65-2.97 6.621-6.621 6.621zm0-9.242c-1.445 0-2.621 1.176-2.621 2.621s1.176 2.621 2.621 2.621 2.621-1.176 2.621-2.621-1.176-2.621-2.621-2.621zM179.57 38.328a6.628 6.628 0 0 1-6.621-6.621c0-3.65 2.97-6.621 6.621-6.621s6.621 2.97 6.621 6.621c0 3.65-2.97 6.621-6.621 6.621zm0-9.242c-1.445 0-2.621 1.176-2.621 2.621s1.176 2.621 2.621 2.621 2.621-1.176 2.621-2.621-1.175-2.621-2.621-2.621z" opacity="1" data-original="#3762cc" class=""></path><circle cx="37.787" cy="206.626" r="12.686" fill="#4671c6" opacity="1" data-original="#4671c6"></circle><path fill="#3762cc" d="M37.787 221.313c-8.098 0-14.687-6.588-14.687-14.687s6.588-14.687 14.687-14.687 14.687 6.588 14.687 14.687-6.589 14.687-14.687 14.687zm0-25.374c-5.893 0-10.687 4.794-10.687 10.687s4.794 10.687 10.687 10.687 10.687-4.794 10.687-10.687-4.794-10.687-10.687-10.687z" opacity="1" data-original="#3762cc" class=""></path><circle cx="202.64" cy="206.626" r="12.686" fill="#4671c6" opacity="1" data-original="#4671c6"></circle><path fill="#3762cc" d="M202.64 221.313c-8.098 0-14.686-6.588-14.686-14.687s6.588-14.687 14.686-14.687 14.687 6.588 14.687 14.687-6.589 14.687-14.687 14.687zm0-25.374c-5.892 0-10.686 4.794-10.686 10.687s4.794 10.687 10.686 10.687c5.893 0 10.687-4.794 10.687-10.687s-4.795-10.687-10.687-10.687z" opacity="1" data-original="#3762cc" class=""></path></g></svg>`;
  chatbotIcon.appendChild(chatbotIconSymbol);
  ChatBotIconDiv.append(ChatBotIconText, chatbotIcon);

  let chatInterface = document.createElement("div");
  chatInterface.className = "chat-interface animate-fade-right";
  chatInterface.id = "chat-interface";
  let chatInterfaceInnerDiv = document.createElement("div");
  chatInterfaceInnerDiv.className = "chatInterfaceinnerDiv";

  //Chatbot Header
  let adminData = localStorage.getItem("adminData");
  adminData = JSON.parse(adminData);
  //console.log(adminData);

  let chatInterfaceHeader = document.createElement("div");
  chatInterfaceHeader.className = "header";
  let Logo = document.createElement("img");
  Logo.src =
    "https://chatbot-eta-ten-41.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FembotLogo.e7ce9467.png&w=128&q=75";
  Logo.alt = "logo";
  Logo.className = "logo";

  chatInterfaceHeader.appendChild(Logo);

  let alertDiv = document.createElement("div");
  alertDiv.className = "alertDiv fade-down";
  alertDiv.style.display = "none";
  alertDiv.id = "alertDivId";
  let alertInnerDiv = document.createElement("div");
  alertInnerDiv.className = "alertInnerDiv";
  let alertIcon = document.createElement("div");
  alertIcon.className = "spinner-for-alertEMBOT";
  alertIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="black" opacity="0.14"/><rect width="2" height="5" x="11" y="1" fill="black" opacity="0.29" transform="rotate(30 12 12)"/><rect width="2" height="5" x="11" y="1" fill="black" opacity="0.43" transform="rotate(60 12 12)"/><rect width="2" height="5" x="11" y="1" fill="black" opacity="0.57" transform="rotate(90 12 12)"/><rect width="2" height="5" x="11" y="1" fill="black" opacity="0.71" transform="rotate(120 12 12)"/><rect width="2" height="5" x="11" y="1" fill="black" opacity="0.86" transform="rotate(150 12 12)"/><rect width="2" height="5" x="11" y="1" fill="black" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"/></g></svg>`;
  alertIcon.id = "alertIcon";

  let alertTextHedding = document.createElement("h4");
  alertTextHedding.className = "alertTextHedding";
  alertTextHedding.id = "alertTextHedding";
  alertTextHedding.innerHTML = alertText;
  alertInnerDiv.append(alertIcon, alertTextHedding);
  alertDiv.appendChild(alertInnerDiv);
  //Chatbot Chatting Interface
  let ChattingInterface = document.createElement("div");
  ChattingInterface.className = "chat-box";
  ChattingInterface.innerHTML = `   
<div class="chat" id="chatting-main"></div>
<hr>
<div class="chat-form" >
  <form class="form" id="sendMsgForm">
      <div class="chat-input">
          <input type="text" name="bot" id="triggerInput" placeholder="Type your message here.." required>
      </div>
      <div >
          <button type="submit" id="handleSubmit" class="submit-btn submitfromBtnpiy">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" d="M3.291 3.309a.75.75 0 0 0-.976.996l3.093 6.945H13a.75.75 0 0 1 0 1.5H5.408l-3.093 6.945a.75.75 0 0 0 .976.996l19-8a.75.75 0 0 0 0-1.382z" clip-rule="evenodd"/></svg>
          </button>
      </div>
  </form>
</div>`;

  //Initial Introduction From
  const IIFContainer = document.createElement("div");
  IIFContainer.id = "IIFContainer";
  IIFContainer.className = "animate-fade-down";
  IIFContainer.innerHTML = `<div class="main-sub-container">
  <div class="intro-main">
    <div class="main-logo" id="flogo"><img src="https://chatbot-eta-ten-41.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FembotLogo.e7ce9467.png&w=128&q=75"></div>
    <div class="titile-hi-there">
      <div>Hi there👋 <br> Access Features Now</div>
    </div>
    <div id="chatBoxIdeal" class="chatBoxIdeal">
    <div class="botChatPASSpan">
      <span>Unlock the Complete Experience! Want to access all features and engage in live chat with our assistant? Simply provide your email address below.</span>
    </div>
   
  </div>
  </div>
  <div class="form-container">
    <div class="icon-container ply-icon-container">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg>
    </div>
    <form id="introductionForm">
      <label for="email">Please introduce yourself:</label>
      <div class="input-container">
        <input type="email" id="triggerInput2" name="Email_Check" placeholder="Your Email" required>
        <button style="padding:0 15px" class="handleSubmit2main submitfromBtnpiy" id="handleSubmit2" type="submit" class="submitfromBtnpiy">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" d="M3.291 3.309a.75.75 0 0 0-.976.996l3.093 6.945H13a.75.75 0 0 1 0 1.5H5.408l-3.093 6.945a.75.75 0 0 0 .976.996l19-8a.75.75 0 0 0 0-1.382z" clip-rule="evenodd"/></svg>
        </button>
      </div>
    </form>
  </div>
</div>
`;

  chatInterface.appendChild(IIFContainer);
  chatInterfaceInnerDiv.appendChild(chatInterfaceHeader);
  chatInterfaceInnerDiv.appendChild(ChattingInterface);
  ChattingInterface.appendChild(alertDiv);
  chatInterface.appendChild(chatInterfaceInnerDiv);
  chatbotIcon.addEventListener("click", () => {
    if (chatInterface.style.display === "none") {
      chatInterface.style.display = "block";
      const user__id = localStorage.getItem("widget_user_id");
      setTimeout(() => {
        document.getElementById(
          "chatbotIconSymbol"
        ).innerHTML = `<svg class="animate-fade-up" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 15 15"><path fill="white" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"/></svg>`;
      }, 100);
    } else {
      chatInterface.style.display = "none";
      setTimeout(() => {
        document.getElementById(
          "chatbotIconSymbol"
        ).innerHTML = `<svg class="roboIconSvgMain animate-fade-down" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 256 256" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#3762cc" d="M190.03 124.549a2 2 0 0 1-2-2v-22.301c0-14.632-11.904-26.536-26.536-26.536H71.809c-14.632 0-26.536 11.904-26.536 26.536v22.301a2 2 0 0 1-4 0v-22.301c0-16.838 13.698-30.536 30.536-30.536h89.685c16.837 0 30.536 13.698 30.536 30.536v22.301a2 2 0 0 1-2 2z" opacity="1" data-original="#3762cc" class=""></path><path fill="#a4c9ff" d="M37.787 204.89a4.036 4.036 0 0 1-4.037-4.037v-13.822c0-9.353 7.609-16.962 16.962-16.962h139.003c9.353 0 16.962 7.609 16.962 16.962v11.147a4.036 4.036 0 1 1-8.074 0v-11.147c0-4.901-3.987-8.888-8.888-8.888H50.712c-4.901 0-8.888 3.987-8.888 8.888v13.822a4.036 4.036 0 0 1-4.037 4.037z" opacity="1" data-original="#a4c9ff"></path><path fill="#3762cc" d="M37.787 206.89a6.044 6.044 0 0 1-6.037-6.038V187.03c0-10.456 8.506-18.962 18.962-18.962h139.003c10.456 0 18.962 8.506 18.962 18.962v11.147c0 3.329-2.708 6.037-6.038 6.037s-6.037-2.708-6.037-6.037V187.03a6.895 6.895 0 0 0-6.888-6.887H50.712a6.895 6.895 0 0 0-6.888 6.887v13.822a6.044 6.044 0 0 1-6.037 6.038zm12.925-34.821c-8.25 0-14.962 6.712-14.962 14.962v13.822c0 1.124.914 2.038 2.037 2.038s2.037-.914 2.037-2.038v-13.822c0-6.003 4.884-10.887 10.888-10.887h139.003c6.003 0 10.888 4.884 10.888 10.887v11.147a2.04 2.04 0 0 0 2.037 2.037 2.04 2.04 0 0 0 2.038-2.037v-11.147c0-8.25-6.712-14.962-14.962-14.962z" opacity="1" data-original="#3762cc" class=""></path><path fill="#e0ebfc" d="m174.476 158.888-57.049-23.303-57.049 23.303a71.36 71.36 0 0 0 9.409 70.452l.191.249a59.79 59.79 0 0 0 94.898-.001l.191-.249a71.356 71.356 0 0 0 9.409-70.451z" opacity="1" data-original="#e0ebfc" class=""></path><path fill="#f9a7a7" d="M133.632 216.525h-32.41a5.327 5.327 0 0 1-5.327-5.327v-18.392a5.327 5.327 0 0 1 5.327-5.327h32.41a5.327 5.327 0 0 1 5.327 5.327v18.392a5.327 5.327 0 0 1-5.327 5.327z" opacity="1" data-original="#f9a7a7"></path><path fill="#3762cc" d="M117.427 255c-19.09 0-37.421-9.045-49.037-24.195l-.19-.249c-15.812-20.623-19.518-48.375-9.673-72.426a2.002 2.002 0 0 1 1.095-1.094l57.049-23.303a2.001 2.001 0 0 1 1.513 0l57.049 23.303c.497.203.891.597 1.095 1.094 9.845 24.051 6.139 51.803-9.673 72.427l-.19.248C154.849 245.955 136.518 255 117.427 255zm-55.509-94.581c-8.915 22.558-5.323 48.426 9.457 67.704l.19.249C82.429 242.541 99.573 251 117.427 251s34.999-8.459 45.862-22.628l.19-.248c14.78-19.278 18.372-45.146 9.457-67.704l-55.51-22.674z" opacity="1" data-original="#3762cc" class=""></path><path fill="#3762cc" d="M133.632 218.525h-32.41c-4.04 0-7.327-3.287-7.327-7.327v-18.392c0-4.04 3.287-7.327 7.327-7.327h32.41c4.04 0 7.327 3.287 7.327 7.327v18.392c0 4.04-3.287 7.327-7.327 7.327zm-32.409-29.046a3.33 3.33 0 0 0-3.327 3.327v18.392a3.331 3.331 0 0 0 3.327 3.327h32.41a3.33 3.33 0 0 0 3.327-3.327v-18.392a3.33 3.33 0 0 0-3.327-3.327z" opacity="1" data-original="#3762cc" class=""></path><path fill="#4671c6" d="M189.663 142.474h-146.3a8.716 8.716 0 0 1-8.716-8.716v-23.263a8.716 8.716 0 0 1 8.716-8.716h146.3a8.716 8.716 0 0 1 8.716 8.716v23.263a8.717 8.717 0 0 1-8.716 8.716z" opacity="1" data-original="#4671c6"></path><path fill="#3762cc" d="M189.663 144.474h-146.3c-5.909 0-10.716-4.807-10.716-10.716v-23.263c0-5.909 4.807-10.715 10.716-10.715h146.3c5.909 0 10.716 4.807 10.716 10.715v23.263c-.001 5.909-4.808 10.716-10.716 10.716zm-146.3-40.694a6.724 6.724 0 0 0-6.716 6.715v23.263a6.724 6.724 0 0 0 6.716 6.716h146.3a6.724 6.724 0 0 0 6.716-6.716v-23.263a6.723 6.723 0 0 0-6.716-6.715z" opacity="1" data-original="#3762cc" class=""></path><path fill="#e0ebfc" d="M128.986 116.431H105.87v-39.16c0-6.383 5.175-11.558 11.558-11.558s11.558 5.175 11.558 11.558z" opacity="1" data-original="#e0ebfc" class=""></path><path fill="#3762cc" d="M117.427 67.712a2 2 0 0 1-2-2V53.999a2 2 0 0 1 4 0v11.713a2 2 0 0 1-2 2z" opacity="1" data-original="#3762cc" class=""></path><circle cx="117.427" cy="45" r="9" fill="#f9a7a7" opacity="1" data-original="#f9a7a7"></circle><path fill="#3762cc" d="M128.986 118.432h-23.117a2 2 0 0 1-2-2V77.271c0-7.476 6.082-13.558 13.558-13.558s13.559 6.082 13.559 13.558v39.161a2 2 0 0 1-2 2zm-21.117-4h19.117V77.271c0-5.271-4.288-9.558-9.559-9.558s-9.558 4.288-9.558 9.558zM117.427 55.999c-6.065 0-11-4.935-11-11s4.935-11 11-11 11 4.935 11 11-4.934 11-11 11zm0-17.999c-3.859 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z" opacity="1" data-original="#3762cc" class=""></path><path fill="#e0ebfc" d="M154.242 165.085H78.784c-16.815 0-30.446-13.631-30.446-30.446v-25.024c0-16.815 13.631-30.446 30.446-30.446h75.458c16.815 0 30.446 13.631 30.446 30.446v25.024c-.001 16.815-13.632 30.446-30.446 30.446z" opacity="1" data-original="#e0ebfc" class=""></path><path fill="#6bdddd" d="M78.784 150.281c-8.625 0-15.643-7.017-15.643-15.643v-25.024c0-8.625 7.017-15.643 15.643-15.643h75.458c8.625 0 15.643 7.017 15.643 15.643v25.024c0 8.625-7.017 15.643-15.643 15.643z" opacity="1" data-original="#6bdddd" class=""></path><path fill="#3762cc" d="M154.242 167.084H78.784c-17.891 0-32.446-14.555-32.446-32.445v-25.024c0-17.891 14.555-32.446 32.446-32.446h75.458c17.891 0 32.446 14.555 32.446 32.446v25.024c-.001 17.891-14.556 32.445-32.446 32.445zM78.784 81.169c-15.685 0-28.446 12.761-28.446 28.446v25.024c0 15.685 12.761 28.445 28.446 28.445h75.458c15.685 0 28.446-12.761 28.446-28.445v-25.024c0-15.685-12.761-28.446-28.446-28.446z" opacity="1" data-original="#3762cc" class=""></path><path fill="#3762cc" d="M154.242 152.281H78.784c-9.728 0-17.643-7.914-17.643-17.642v-25.024c0-9.728 7.915-17.643 17.643-17.643h75.458c9.729 0 17.643 7.915 17.643 17.643v25.024c0 9.728-7.915 17.642-17.643 17.642zM78.784 95.973c-7.522 0-13.643 6.12-13.643 13.643v25.024c0 7.522 6.12 13.642 13.643 13.642h75.458c7.523 0 13.643-6.12 13.643-13.642v-25.024c0-7.522-6.12-13.643-13.643-13.643z" opacity="1" data-original="#3762cc" class=""></path><path fill="#4671c6" d="M91.387 133.407a7.357 7.357 0 0 1-7.357-7.357v-7.847a7.357 7.357 0 0 1 14.714 0v7.847a7.357 7.357 0 0 1-7.357 7.357zM143.467 133.407a7.357 7.357 0 0 1-7.357-7.357v-7.847a7.357 7.357 0 0 1 14.714 0v7.847a7.357 7.357 0 0 1-7.357 7.357z" opacity="1" data-original="#4671c6"></path><path fill="#a4c9ff" d="M175.255 3h50.269c6.308 0 11.421 5.113 11.421 11.421v34.571c0 6.308-5.114 11.421-11.421 11.421h-32.195L182.292 71.45c-.744.744-2.006.116-1.862-.926l1.398-10.111h-6.572c-6.308 0-11.421-5.113-11.421-11.421V14.421C163.834 8.113 168.947 3 175.255 3z" opacity="1" data-original="#a4c9ff"></path><circle cx="221.209" cy="31.707" r="4.621" fill="#e0ebfc" opacity="1" data-original="#e0ebfc" class=""></circle><circle cx="200.389" cy="31.707" r="4.621" fill="#e0ebfc" opacity="1" data-original="#e0ebfc" class=""></circle><circle cx="179.57" cy="31.707" r="4.621" fill="#e0ebfc" opacity="1" data-original="#e0ebfc" class=""></circle><path fill="#3762cc" d="M181.517 73.772a3.097 3.097 0 0 1-3.068-3.522l1.083-7.837h-4.277c-7.4 0-13.421-6.021-13.421-13.421V14.421c0-7.4 6.021-13.421 13.421-13.421h50.269c7.4 0 13.421 6.021 13.421 13.421v34.571c0 7.4-6.021 13.421-13.421 13.421h-31.367l-10.451 10.451a3.094 3.094 0 0 1-2.189.908zM175.255 5c-5.195 0-9.421 4.227-9.421 9.421v34.571c0 5.195 4.227 9.421 9.421 9.421h6.572a2 2 0 0 1 1.981 2.274l-1.029 7.448 9.136-9.136a2 2 0 0 1 1.414-.586h32.195c5.195 0 9.421-4.226 9.421-9.421V14.421c0-5.195-4.227-9.421-9.421-9.421z" opacity="1" data-original="#3762cc" class=""></path><path fill="#3762cc" d="M221.208 38.328a6.628 6.628 0 0 1-6.621-6.621c0-3.65 2.97-6.621 6.621-6.621s6.621 2.97 6.621 6.621c.001 3.65-2.97 6.621-6.621 6.621zm0-9.242c-1.445 0-2.621 1.176-2.621 2.621s1.176 2.621 2.621 2.621 2.621-1.176 2.621-2.621a2.623 2.623 0 0 0-2.621-2.621zM200.389 38.328a6.629 6.629 0 0 1-6.621-6.621c0-3.65 2.97-6.621 6.621-6.621s6.621 2.97 6.621 6.621c0 3.65-2.97 6.621-6.621 6.621zm0-9.242c-1.445 0-2.621 1.176-2.621 2.621s1.176 2.621 2.621 2.621 2.621-1.176 2.621-2.621-1.176-2.621-2.621-2.621zM179.57 38.328a6.628 6.628 0 0 1-6.621-6.621c0-3.65 2.97-6.621 6.621-6.621s6.621 2.97 6.621 6.621c0 3.65-2.97 6.621-6.621 6.621zm0-9.242c-1.445 0-2.621 1.176-2.621 2.621s1.176 2.621 2.621 2.621 2.621-1.176 2.621-2.621-1.175-2.621-2.621-2.621z" opacity="1" data-original="#3762cc" class=""></path><circle cx="37.787" cy="206.626" r="12.686" fill="#4671c6" opacity="1" data-original="#4671c6"></circle><path fill="#3762cc" d="M37.787 221.313c-8.098 0-14.687-6.588-14.687-14.687s6.588-14.687 14.687-14.687 14.687 6.588 14.687 14.687-6.589 14.687-14.687 14.687zm0-25.374c-5.893 0-10.687 4.794-10.687 10.687s4.794 10.687 10.687 10.687 10.687-4.794 10.687-10.687-4.794-10.687-10.687-10.687z" opacity="1" data-original="#3762cc" class=""></path><circle cx="202.64" cy="206.626" r="12.686" fill="#4671c6" opacity="1" data-original="#4671c6"></circle><path fill="#3762cc" d="M202.64 221.313c-8.098 0-14.686-6.588-14.686-14.687s6.588-14.687 14.686-14.687 14.687 6.588 14.687 14.687-6.589 14.687-14.687 14.687zm0-25.374c-5.892 0-10.686 4.794-10.686 10.687s4.794 10.687 10.686 10.687c5.893 0 10.687-4.794 10.687-10.687s-4.795-10.687-10.687-10.687z" opacity="1" data-original="#3762cc" class=""></path></g></svg>`;
      }, 100);
    }
    getChatBotData(userId);
  });

  chatbotContainer.appendChild(ChatBotIconDiv);
  chatbotContainer.appendChild(chatInterface);

  document.body.appendChild(chatbotContainer);
  chattingData();
  triggerMsg();
  FinalEmailSUbmitFrom();
};
function submitFunction(e, subtriggerValue) {
  e.preventDefault();
  getChatBotData(userId);
  let formName = e.target.id;
  let triggerInputTag;
  let triggerValue;
  if (formName == "introductionForm") {
    triggerInputTag = document.getElementById("triggerInput2");
    triggerValue = triggerInputTag.value;
    document.getElementById("IIFContainer").style.display = "none";
  } else {
    triggerInputTag = document.getElementById("triggerInput");
    triggerValue = triggerInputTag.value;
  }

  // console.log(getCookie("widget_user_email"));
  simulateSocketListener();
  if (triggerInputTag.name == "liveChat") {
    //Live chat user register

    if (triggerInputTag.type == "email") {
      const email = triggerInputTag.value;
      mainChatData.push({
        replaytext: triggerInputTag.value,
        responseMsg: "Hold on, our assistant is joining soon.😊",
        suggestedTrigger: ["end this conversation"],
      });
      //create user
      const registerUser = (inputData) => {
        const API_PATH = `${host_URL}/live/create-user/${userId}`;
        fetch(API_PATH, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.status == "success") {
              getParticularUser(data?.user?._id);
              triggerInputTag.type = "text";
              triggerInputTag.setAttribute("placeholder", "type your message");
              localStorage.setItem("widget_user_id", data?.user?._id);
              localStorage.setItem("widget_user_email", data?.user?.userEmail);
              triggerInputTag.addEventListener("focus", function () {
                triggerInputTag.value = "";
              });
              setTimeout(() => {
                //sending notification to admin user is joined
                const NotifyData = {
                  userInfo: {
                    userName: data?.user?.userName,
                    userEmail: data?.user?.userEmail,
                    _id: data?.user?._id,
                    visitedPage: data?.user?.visitedPage,
                  },
                  adminId: userId,
                  notificationMsg: "is joined live chat from",
                };
                socket.emit("notifications", NotifyData);
              }, 1000);
              //checking asssistant is joine or not
              socket.on("checkAssitJoinedStatus", (data) => {
                if (data.status == false) {
                  //  console.log(data.msg, "no");
                  const alertbox = document.getElementById("alertDivId");
                  alertbox.style.display = "block";
                  const alertText = document.getElementById("alertTextHedding");
                  alertText.innerHTML = `Please wait <br> <span> Assistant is joining</span>`;
                  getParticularUser(data?.user?._id);
                } else {
                  // console.log(data.msg, "yes");
                  const alertbox = document.getElementById("alertDivId");
                  alertbox.style.display = "block";
                  const alertText = document.getElementById("alertTextHedding");
                  alertText.innerHTML = `${data?.user?.joinedExecutive?.executive?.userName} is joined`;
                  localStorage.setItem(
                    "joinedAssistantId",
                    data?.user?.joinedExecutive?.executive?._id
                  );
                  // triggerInputTag.addEventListener("focus", function () {
                  //   // Set the input value to the placeholder text when focused
                  //   triggerInputTag.value = "";
                  // });
                  setTimeout(() => {
                    alertbox.style.display = "none";
                  }, 2000);
                }
              });
              // adding user to map
              socket.emit("addUser", data?.user?._id);
              // const payload = { from: data?.user?._id };
              // getMsg(payload);
            } else {
              //   console.log(data);
            }
          })
          .catch((e) => {
            console.error(e);
          });
      };
      //tracking location
      const getLocation = async () => {
        try {
          const res = await fetch("https://ipapi.co/json");
          const data = await res.json();
          if (data) {
            const payload = {
              userName: email.split("@")[0],
              userEmail: email,
              userId: userId,
              uniqueIpAddress: data?.ip,
              location: {
                country_code: data?.country_code,
                ip: data?.ip,
                country_name: data?.country_name,
                region: data?.region,
                timezone: data?.timezone,
                longitude: data?.longitude,
                latitude: data?.latitude,
                city: data?.city,
              },
              visitedPage: window.location.href,
            };
            registerUser(payload);
          }
        } catch (e) {
          console.log(e);
        }
      };
      getLocation();
    } else {
      setTimeout(() => {
        document.getElementById("ENdLiveChatBtn").style.display = "block";
      }, 2000);
      //Live Chat socket io implimentation
      const widget_user_id = localStorage.getItem("widget_user_id");
      if (widget_user_id) {
        addMsg(triggerValue);
      }
      mainChatData.push({ replaytext: triggerValue });
    }
  } else if (triggerInputTag.name == "Email_Check") {
    if (isValidEmail(triggerInputTag.value)) {
      const email = triggerInputTag.value;
      mainChatData.push({
        replaytext: triggerInputTag.value,
        responseMsg: "Hold on, our assistant is joining soon.😊",
        suggestedTrigger: ["end this conversation"],
      });
      //create user
      const registerUser = (inputData) => {
        const API_PATH = `${host_URL}/live/create-user/${userId}`;
        fetch(API_PATH, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.status == "success") {
              getParticularUser(data?.user?._id);
              triggerInputTag.type = "text";
              triggerInputTag.setAttribute("placeholder", "type your message");
              localStorage.setItem("widget_user_id", data?.user?._id);
              localStorage.setItem("widget_user_email", data?.user?.userEmail);
              triggerInputTag.addEventListener("focus", function () {
                triggerInputTag.value = "";
              });
              setTimeout(() => {
                //sending notification to admin user is joined
                const NotifyData = {
                  userInfo: {
                    userName: data?.user?.userName,
                    userEmail: data?.user?.userEmail,
                    _id: data?.user?._id,
                    visitedPage: data?.user?.visitedPage,
                  },
                  adminId: userId,
                  notificationMsg: "is joined live chat from",
                };
                socket.emit("notifications", NotifyData);
              }, 1000);
              //checking asssistant is joine or not
              socket.on("checkAssitJoinedStatus", (data) => {
                if (data.status == false) {
                  //  console.log(data.msg, "no");
                  const alertbox = document.getElementById("alertDivId");
                  alertbox.style.display = "block";
                  const alertText = document.getElementById("alertTextHedding");
                  alertText.innerHTML = `Please wait <br> <span> Assistant is joining</span>`;
                  getParticularUser(data?.user?._id);
                } else {
                  // console.log(data.msg, "yes");
                  const alertbox = document.getElementById("alertDivId");
                  alertbox.style.display = "block";
                  const alertText = document.getElementById("alertTextHedding");
                  alertText.innerHTML = `${data?.user?.joinedExecutive?.executive?.userName} is joined`;

                  localStorage.setItem(
                    "joinedAssistantId",
                    data?.user?.joinedExecutive?.executive?._id
                  );
                  // triggerInputTag.addEventListener("focus", function () {
                  //   // Set the input value to the placeholder text when focused
                  //   triggerInputTag.value = "";
                  // });
                  setTimeout(() => {
                    alertbox.style.display = "none";
                  }, 2000);
                }
              });
              // adding user to map
              socket.emit("addUser", data?.user?._id);
              // const payload = { from: data?.user?._id };
              // getMsg(payload);
            } else {
              //   console.log(data);
            }
          })
          .catch((e) => {
            console.error(e);
          });
      };
      //tracking location
      const getLocation = async () => {
        try {
          const res = await fetch("https://ipapi.co/json");
          const data = await res.json();
          if (data) {
            const payload = {
              userName: email.split("@")[0],
              userEmail: email,
              userId: userId,
              uniqueIpAddress: data?.ip,
              location: {
                country_code: data?.country_code,
                ip: data?.ip,
                country_name: data?.country_name,
                region: data?.region,
                timezone: data?.timezone,
                longitude: data?.longitude,
                latitude: data?.latitude,
                city: data?.city,
              },
              visitedPage: window.location.href,
            };
            registerUser(payload);
          }
        } catch (e) {
          console.log(e);
        }
      };
      getLocation();
    } else if (wrongEmailCount == 2) {
      document.getElementById("IIFContainer").style.display = "block";
      wrongEmailCount = 0;
      const mainTheme = JSON.parse(localStorage.getItem("adminData")).theme;
      document.querySelector(
        ".chatbot-container #IIFContainer .intro-main"
      ).style.background = mainTheme;
      document.querySelector(
        ".chatbot-container #IIFContainer .handleSubmit2main"
      ).style.background = mainTheme;
    } else {
      wrongEmailCount = wrongEmailCount + 1;
      let emailValidResponse = {
        id: -1,
        responseMsg: "Oops... it doesn't look like an email address 🧐",
        replaytext: subtriggerValue ? subtriggerValue : triggerValue,
      };
      mainChatData.push(emailValidResponse);
      setTimeout(() => {
        addBotFromMsgmDashbord(emailValidResponse.responseMsg);
      }, 2000);
    }
  } else {
    let lowercaseMsg;
    if (subtriggerValue) {
      lowercaseMsg = subtriggerValue.toLowerCase();
    } else {
      lowercaseMsg = triggerValue.toLowerCase();
    }
    const widget_user_id = localStorage.getItem("widget_user_id");
    if (widget_user_id) {
      addMsg(lowercaseMsg);
    }
    // Find a matching response in responseDataBOT based on lowercaseMsg
    let matchingResponse = responseDataBOT.find((response) =>
      response.triggerText.some(
        (trigger) => trigger.toLowerCase() === lowercaseMsg
      )
    );

    if (matchingResponse) {
      // If a matching response is found, add it to mainChatData
      matchingResponse["replaytext"] = subtriggerValue
        ? subtriggerValue
        : triggerValue;
      mainChatData.push(matchingResponse);
      setTimeout(() => {
        addBotFromMsgmDashbord(matchingResponse.responseMsg);
      }, 2000);
    } else {
      // If no matching response is found, add a default response
      let defaultResponse = {
        id: -1,
        responseMsg:
          "I'm sorry, I don't understand that. Please ask something else.",
        replaytext: subtriggerValue ? subtriggerValue : triggerValue,
        suggestedTrigger: [
          "Tell me about your company?",
          "I need help with a service",
        ],
      };
      mainChatData.push(defaultResponse);
      setTimeout(() => {
        addBotFromMsgmDashbord(defaultResponse.responseMsg);
      }, 2000);
    }
    // console.log("matchingResponse?.replaytext", matchingResponse);
    if (matchingResponse?.responseMsg == "Sure thing, what's your email ID?") {
      let inputValue = document.getElementById("triggerInput");
      inputValue.setAttribute("name", "Email_Check");
    }

    if (matchingResponse?.replaytext == "end this conversation") {
      let inputTag = document.getElementById("triggerInput");
      inputTag.setAttribute("name", "bot");
      document.getElementById("alertDivId").style.display = "none";
      socket.off("checkAssitJoinedStatus");
      inputTag.addEventListener("focus", function () {
        inputTag.value = "";
      });
      // setTimeout(() => {
      //   socket.emit("logoutAutomatically", {
      //     adminId: userId,
      //     joinedExecutiveEmail: localStorage.getItem("joinedAssistantEmail"),
      //   });
      // }, 4000);
      // setTimeout(() => {
      //   localStorage.removeItem("joinedAssistantEmail");
      //   localStorage.removeItem("joinedAssistantId");
      // }, 5000);
    }
  }
  subtriggerValue = "";
  document.getElementById("triggerInput").value = "";
  chattingData();
  // console.log("mainChatData", mainChatData);
}
const triggerMsg = () => {
  document
    .getElementById("sendMsgForm")
    .addEventListener("submit", submitFunction);
};

const FinalEmailSUbmitFrom = () => {
  document
    .getElementById("introductionForm")
    .addEventListener("submit", submitFunction);
};
appendData();

function chattingData() {
  const parent = document.getElementById("chatting-main");
  parent.innerHTML = "";
  const loadingIndicator = document.createElement("div");
  loadingIndicator.className = "loading-dots-embot";
  loadingIndicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>`;

  const ENdLiveChatBtn = document.createElement("div");
  ENdLiveChatBtn.innerHTML = `<label class="switch">
  <input type="checkbox" id="mySwitch" checked>
  <span class="slider"></span>
</label>`;
  ENdLiveChatBtn.className = "ENdLiveChatBtn";
  ENdLiveChatBtn.id = "ENdLiveChatBtn";
  ENdLiveChatBtn.style.display = "none";
  parent.appendChild(ENdLiveChatBtn);

  var switchTab = document.getElementById("mySwitch");
  switchTab.addEventListener("change", () => {
    var switchValue = switchTab.checked;
    if (switchValue == false) {
      let inputTag = document.getElementById("triggerInput");
      inputTag.setAttribute("name", "bot");
      setTimeout(() => {
        mainChatData.push({
          replaytext: "Terminate Live Chat Session.",
          responseMsg: "Live chat terminated. Continue with bot chat.",
          suggestedTrigger: [
            "Tell me about your services?",
            "Tell me about your company?",
            "What do you offer?",
          ],
        });
        const widget_user_id = localStorage.getItem("widget_user_id");
        if (widget_user_id) {
          addMsg("Terminate Live Chat Session.");
          setTimeout(() => {
            socket.emit("logoutAutomatically", {
              adminId: userId,
              joinedExecutiveEmail: localStorage.getItem(
                "joinedAssistantEmail"
              ),
            });
          }, 2000);
          setTimeout(() => {
            localStorage.removeItem("joinedAssistantEmail");
            localStorage.removeItem("joinedAssistantId");
          }, 4000);
        }
        ENdLiveChatBtn.style.display = "none";
        chattingData();
      }, 2000);
    } else {
    }
  });

  mainChatData.forEach(
    (
      {
        responseMsg,
        replaytext,
        attachmentFile,
        suggestedTrigger,
        urlLabels,
        multipleRes,
        responsesData,
        assiMsgData,
      },
      index
    ) => {
      //console.log(attachmentFile, "attachmentFile");
      //trigger
      let triggerDiv = document.createElement("div");
      triggerDiv.className = "trigger";

      let triggerInnerDiv = document.createElement("div");
      const triggerSpan = document.createElement("span");
      triggerSpan.innerText = replaytext;
      triggerSpan.style.color = "#fff";
      triggerSpan.style.background = JSON.parse(
        localStorage.getItem("adminData")
      ).theme;
      if (replaytext) {
        triggerInnerDiv.append(triggerSpan);
        triggerDiv.appendChild(triggerInnerDiv);
      }

      //response
      let ResponseDiv = document.createElement("div");
      ResponseDiv.className = "response";
      ResponseDiv.innerHTML = "";
      let ResponseInnerDiv = document.createElement("div");
      ResponseInnerDiv.className = "innerDivResponse";
      let userIconResponse = document.createElement("div");
      if (assiMsgData?.assistantImage) {
        userIconResponse.className = "assistantBGImageStyle";
        userIconResponse.style.background = `url(${host_URL}/images/assistant_images/${assiMsgData?.assistantImage})`;
      } else {
        userIconResponse.className = "submitfromBtnpiy2 sbfbt2SpecialBot";
        userIconResponse.style.background = JSON.parse(
          localStorage.getItem("adminData")
        ).theme;
        userIconResponse.innerHTML = `<svg  class="responseBotMain" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g transform="matrix(1,0,0,1,0,0)"><path d="M467 151.06h-31.421C408.855 87.606 350.01 41.493 282.265 32.686c-67.134-8.95-133.096 16.89-176.25 68.906-12.686 15.293-22.749 31.919-30.117 49.468H45c-24.814 0-45 20.186-45 45v60c0 24.814 20.186 45 45 45h61.601l-6.445-19.673c-18.765-57.305-8.203-115.855 28.96-160.635 36.519-44.019 92.285-65.801 149.253-58.33 60.247 7.848 112.542 50.455 133.262 108.574l.126.337a129.933 129.933 0 0 1 7.031 27.393c4.497 28.052 1.934 56.484-7.397 82.222l-.066.179C388.164 346.886 325.87 391.06 256.293 391.06c-24.976 0-45.293 20.186-45.293 45s20.186 45 45 45 45-20.186 45-45v-20.23c59.894-14.236 110.202-56.693 134.383-114.771H467c24.814 0 45-20.186 45-45v-60c0-24.814-20.186-44.999-45-44.999z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path><path d="M121 331.06v30h135c74.443 0 135-60.557 135-135s-60.557-135-135-135-135 60.557-135 135a134.921 134.921 0 0 0 28.828 83.394C146.21 322.095 134.667 331.06 121 331.06zm180-120h30v30h-30zm-60 0h30v30h-30zm-60 0h30v30h-30z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg>`;
      }

      let ResponseTextDiv = document.createElement("div");
      ResponseTextDiv.className = "responseTextDiv";
      const ResposeSpan = document.createElement("span");
      ResposeSpan.innerText = responseMsg;
      const loadingSpan = document.createElement("span");
      loadingSpan.append(loadingIndicator);
      let attachementImgDiv = document.createElement("div");
      attachementImgDiv.style.position = "relative";
      let attachementImg = document.createElement("img");
      attachementImg.src = `${host_URL}/images/live_chat_attachements/${attachmentFile}`;
      attachementImg.className = "attachmentImg";
      let attachementFileIframe = document.createElement("iframe");
      attachementFileIframe.src = `${host_URL}/images/live_chat_attachements/${attachmentFile}`;
      attachementFileIframe.width = "180px";
      attachementFileIframe.height = "180px";
      let attachementImgDownloadBtn = document.createElement("button");
      attachementImgDownloadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="white" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>`;
      attachementImgDownloadBtn.className = "attachementImgDownloadBtn";
      attachementImgDownloadBtn.id = "attachementImgDownloadBtn";
      attachementImgDownloadBtn.addEventListener("click", () => {
        fetch(attachmentFile)
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;

            // Set the "download" attribute with a suggested file name
            link.setAttribute("download", "embot_download.jpg");

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) => {
            console.error("Error fetching or downloading the image:", error);
          });
      });

      if (attachmentFile?.length > 0) {
        if (isImageFileName(attachmentFile)) {
          attachementImgDiv.append(attachementImg, attachementImgDownloadBtn);
        } else {
          attachementImgDiv.append(
            attachementFileIframe,
            attachementImgDownloadBtn
          );
        }
      }
      const multipleResponseDiv = document.createElement("div");
      multipleResponseDiv.className = "multiple-response";
      if (multipleRes) {
        createSlider(responsesData, multipleResponseDiv);
      }

      let Subtriggers = document.createElement("div");
      Subtriggers.className = "subtriggerDiv";
      let urlLabelsDIv = document.createElement("div");

      urlLabelsDIv.className = "urlLabelsDIv";
      if (responseDataBOT) {
        suggestedTrigger?.map((elem, index) => {
          const button = document.createElement("button");
          button.className = "subtriggerBtn";
          button.innerText = elem;
          button.key = index;
          button.addEventListener("click", (e) => {
            if (elem == "end this conversation") {
              e.preventDefault();
              let inputTag = document.getElementById("triggerInput");
              inputTag.setAttribute("name", "bot");
              submitFunction(e, elem);
              document.getElementById("alertDivId").style.display = "none";
              setTimeout(() => {
                socket.emit("logoutAutomatically", {
                  adminId: userId,
                  joinedExecutiveEmail: localStorage.getItem(
                    "joinedAssistantEmail"
                  ),
                });
              }, 2000);
              setTimeout(() => {
                localStorage.removeItem("joinedAssistantEmail");
                localStorage.removeItem("joinedAssistantId");
              }, 4000);
            } else {
              e.preventDefault();
              submitFunction(e, elem);
            }
          });
          Subtriggers.appendChild(button);
        });
      }

      ResponseTextDiv.appendChild(ResposeSpan);
      if (attachmentFile) {
        ResponseTextDiv.appendChild(attachementImgDiv);
      }
      if (suggestedTrigger) {
        ResponseTextDiv.appendChild(Subtriggers);
      }
      if (urlLabels) {
        urlLabels.map((elem, index) => {
          const button = document.createElement("button");
          button.key = index;
          button.className = "urlLabelbtn";

          button.innerText = elem.label;
          const icon = document.createElement("div");
          icon.className = "submitfromBtnpiy2";
          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>`;
          button.appendChild(icon);
          button.addEventListener("click", () => {
            window.location.href = elem.link;
          });
          urlLabelsDIv.appendChild(button);
        });
        ResponseTextDiv.appendChild(urlLabelsDIv);
      }
      // ResponseInnerDiv.append(userIconResponse, ResponseTextDiv);
      if (index != mainChatData.length - 1) {
        ResponseInnerDiv.append(userIconResponse, ResponseTextDiv);
      } else {
        ResponseInnerDiv.append(userIconResponse, loadingSpan);
        ResponseDiv.appendChild(ResponseInnerDiv);
        setTimeout(() => {
          ResponseInnerDiv.removeChild(loadingSpan);
          ResponseInnerDiv.appendChild(ResponseTextDiv);
          parent.scrollTop = parent.scrollHeight;
        }, 2000);
      }

      !multipleRes && ResponseDiv.appendChild(ResponseInnerDiv);

      if (responseMsg != undefined && replaytext == undefined) {
        parent.appendChild(ResponseDiv);
      } else if (responseMsg == undefined && replaytext != undefined) {
        parent.appendChild(triggerDiv);
      } else {
        parent.append(triggerDiv, ResponseDiv);
      }
      if (multipleRes) {
        parent.append(multipleResponseDiv);
        parent.scrollTop = parent.scrollHeight;
      }
    }
  );
  parent.scrollTop = parent.scrollHeight;
}

chattingData();

//send msg
async function addMsg(TextMsgdata) {
 // console.log(TextMsgdata, "TextMsgdata");
  setTimeout(() => {
    socket.emit("sendMsg", {
      to: localStorage.getItem("joinedAssistantId") || userId,
      from: localStorage.getItem("widget_user_id"),
      message: TextMsgdata,
    });
  }, 1000);

  const API_PATH = `${host_URL}/live/addmsg`;
  fetch(API_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: localStorage.getItem("joinedAssistantId") || userId,
      from: localStorage.getItem("widget_user_id"),
      message: TextMsgdata,
      type: localStorage.getItem("joinedAssistantId") ? "livechat" : "bot",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status == "success") {
        // toast.success(data.message);
        console.log(data.message);
      } else {
        //   toast.error(data.message);
        console.log(data.message);
      }
    })
    .catch((e) => {
      console.error(e);
    });

  //   mainChatData.push({ replaytext: TextMsgdata });
}
//get msg
async function getMsg(parametersData) {
  //console.log("msg", "msd");
  try {
    const res = await fetch(`${host_URL}/live/getmsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parametersData),
    });
    const data = await res.json();
    // console.log(data);
    data?.projectMessages?.forEach((elem) => {
      if (elem.myself === false) {
        mainChatData.push({
          responseMsg: elem.message,
          attachmentFile: elem?.attachmentFile,
          assiMsgData: elem?.assiMsgData,
        });
      } else {
        mainChatData.push({ replaytext: elem.message });
      }
    });
    // console.log(data, "daata");
    chattingData();
    const parent = document.getElementById("chatting-main");
    parent.scrollTop = parent.scrollHeight;
  } catch (e) {
    console.log(e);
  }
}

//get particular user
async function getParticularUser(userId) {
  try {
    const res = await fetch(`${host_URL}/live/get-puser/${userId}`);
    const data = await res.json();
    //console.log(data);
    setTimeout(() => {
      if (data.data.joinedExecutive.status == false) {
        socket.emit("updateUserAssistantStatus", userId);
      } else {
        const inputValue = document.getElementById("triggerInput");
        inputValue.setAttribute("name", "liveChat");
        document.getElementById("ENdLiveChatBtn").style.display = "block";
      }
    }, 1000);
  } catch (e) {
    console.log(e);
  }
}

// Throttle function implementation
function throttle(func, delay) {
  let canCall = true;

  return function () {
    if (canCall) {
      func.apply(this, arguments);
      canCall = false;
      // setTimeout(() => {
      //   canCall = true;
      // }, delay);
    }
  };
}

function initialRegisterUser(inputData) {
  const API_PATH = `${host_URL}/live/create-user/${userId}`;
  fetch(API_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("widget_user_id", data?.user?._id);

      setTimeout(() => {
        localStorage.setItem("widget_user_email", data?.user?.userEmail);
        s;
      }, 4000);

      // adding user to map

      socket.emit("addUser", data?.user?._id);
      // const payload = { from: data?.user?._id };
      // getMsg(payload);
      setTimeout(() => {
        //sending notification to admin user is joined
        const NotifyData = {
          userInfo: {
            userName: data?.user?.userName,
            userEmail: data?.user?.userEmail,
            _id: data?.user?._id,
            visitedPage: data?.user?.visitedPage,
          },
          adminId: userId,
          notificationMsg: "is Registerd on chatbot from",
        };
        socket.emit("notifications", NotifyData);
      }, 2000);
    })
    .catch((e) => {
      console.error(e);
    });
}

async function getInitialUserLocation(email) {
  try {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    if (data) {
      const payload = {
        userName: email.split("@")[0],
        userEmail: email,
        userId: userId,
        location: {
          country_code: data?.country_code,
          ip: data?.ip,
          country_name: data?.country_name,
          region: data?.region,
          timezone: data?.timezone,
          longitude: data?.longitude,
          latitude: data?.latitude,
          city: data?.city,
        },
        visitedPage: window.location.href,
      };
      initialRegisterUser(payload);
    }
  } catch (e) {
    console.log(e);
  }
}

// document
//   .getElementById("introductionForm")
//   .addEventListener("submit", InitialUserRegisterFrom);

// function InitialUserRegisterFrom(e) {
//   e.preventDefault();
//   let emailInput = document.getElementById("introductionForm_email");
//   //console.log(emailInput.value);
//   getInitialUserLocation(emailInput.value);
// }

const endLiveChatfun = document.getElementById("ENdLiveChatButton");

async function addBotFromMsgmDashbord(TextMsgdata, type, assiMsgData) {
  setTimeout(() => {
    socket.emit("sendMsg", {
      to: localStorage.getItem("widget_user_id"),
      from: localStorage.getItem("joinedAssistantId") || userId,
      message: TextMsgdata,
      type: type ? type : "bot",
      assiMsgData: assiMsgData ? assiMsgData : null,
    });
  }, 1000);

  console.log(TextMsgdata, type, assiMsgData);

  const API_PATH = `${host_URL}/live/addmsg`;
  fetch(API_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: localStorage.getItem("widget_user_id"),
      from: localStorage.getItem("joinedAssistantId") || userId,
      message: TextMsgdata,
      type: localStorage.getItem("joinedAssistantId") ? "livechat" : "bot",
      assiMsgData: assiMsgData ? JSON.stringify(assiMsgData) : null,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status == "success") {
        // toast.success(data.message);
        //console.log(data.message);
      } else {
        // toast.error(data.message);
        //console.log(data.message);
      }
    })
    .catch((e) => {
      console.error(e);
    });

  //   mainChatData.push({ replaytext: TextMsgdata });
}

setTimeout(() => {
  //checking asssistant is joine or not
  socket.on("AssistantJoined", (data) => {
    const alertbox = document.getElementById("alertDivId");
    alertbox.style.display = "block";
    const alertText = document.getElementById("alertTextHedding");
    alertText.innerHTML = `${data?.Assi_userName} is joined`;
    localStorage.setItem("joinedAssistantId", data?.Assi__id);
    localStorage.setItem("joinedAssistantEmail", data?.Assi_userEmail);
    let joinedAssitNotifyWithNameandImage = {
      id: -1,
      responseMsg: `${data?.Assi_userName} is joined`,
      assiMsgData: data,
    };
    mainChatData.push(joinedAssitNotifyWithNameandImage);
    setTimeout(() => {
      addBotFromMsgmDashbord(
        joinedAssitNotifyWithNameandImage.responseMsg,
        "livechat",
        data
      );
    }, 2000);
    setTimeout(() => {
      alertbox.style.display = "none";
    }, 2000);
    let inputValue = document.getElementById("triggerInput");
    inputValue.setAttribute("name", "liveChat");
    // inputValue.addEventListener("focus", () => {
    //   inputValue.setAttribute("name", "liveChat");
    // });
    setTimeout(() => {
      document.getElementById("ENdLiveChatBtn").style.display = "block";
    }, 2000);
    socket.emit("addUser", localStorage.getItem("widget_user_id"));
    simulateSocketListener();
    // mainChatData.push({
    //   responseMsg: "Hello!",
    // });
    // chattingData();
  });

  socket.on("AssistantLogoutSuccessfully", (data) => {
    // console.log(data, "logout");
    const alertbox = document.getElementById("alertDivId");
    alertbox.style.display = "block";
    const alertText = document.getElementById("alertTextHedding");
    alertText.innerHTML = `${data?.Assi_userName} is left live chat`;
    localStorage.removeItem("joinedAssistantId");
    setTimeout(() => {
      alertbox.style.display = "none";
    }, 2000);
    let inputValue = document.getElementById("triggerInput");
    inputValue.setAttribute("name", "bot");
    // inputValue.addEventListener("focus", () => {
    //   inputValue.setAttribute("name", "bot");
    // });

    setTimeout(() => {
      document.getElementById("ENdLiveChatBtn").style.display = "none";
      localStorage.removeItem("joinedAssistantEmail");
    }, 2000);

    mainChatData.push({
      responseMsg:
        "Assistant Left the Live Chat Session. Please continue with bot chat.",
      suggestedTrigger: [
        "Tell me about your services?",
        "Tell me about your company?",
        "What do you offer?",
      ],
    });

    chattingData();
  });
}, 4000);

//slider component
function createSlider(responsesData, parent) {
  // let slideIndex = 1;
  //slider
  const slideshow_container = document.createElement("div");
  slideshow_container.className = "slideshow-container";
  // Next and previous buttons

  responsesData?.map((elem, index) => {
    const slide = document.createElement("div");
    slide.className = `mySlides fade ${elem?._id}`;
    slide.key = index;

    //slide card
    const swiper_slide_card = document.createElement("div");
    swiper_slide_card.className = "swiper-slide";

    //image div and tag
    const sliderImageDiv = document.createElement("div");
    const sliderImgTag = document.createElement("img");
    sliderImgTag.src = elem?.attachmentFile;

    //slider-slide-content div

    const slider_slide_content = document.createElement("div");
    slider_slide_content.className = "swiper-slide-content";

    //title
    const sliderTitle = document.createElement("h3");
    sliderTitle.innerText = elem?.title;

    //description
    const sliderDescription = document.createElement("p");
    sliderDescription.innerText = elem?.responseMsg;

    //links
    const sliderLinksDiv = document.createElement("div");
    sliderLinksDiv.className = "swiper-slide-links";
    elem?.urlLabels?.forEach((item, index) => {
      //anchor tags
      const sliderlink = document.createElement("a");
      sliderlink.key = index;
      sliderlink.href = item?.link;
      sliderlink.title = item?.link;
      sliderlink.innerText = item?.label;
      sliderLinksDiv.appendChild(sliderlink);
    });

    //appends
    sliderImageDiv.appendChild(sliderImgTag);
    slider_slide_content.append(sliderTitle, sliderDescription, sliderLinksDiv);
    swiper_slide_card.append(sliderImageDiv, slider_slide_content);
    slide.appendChild(swiper_slide_card);
    slideshow_container.appendChild(slide);
  });

  const prev = document.createElement("a");
  prev.className = "prev";
  prev.innerHTML = `&#10094;`;
  prev.addEventListener("click", () => {
    plusSlides(-1, parent);
  });

  const next = document.createElement("a");
  next.className = "next";
  next.innerHTML = `&#10095;`;
  next.addEventListener("click", () => {
    plusSlides(1, parent);
  });

  //appends
  slideshow_container.append(prev, next);
  parent.appendChild(slideshow_container);
  showSlides(1, parent);
}
//slider
let slideIndex = 1;

// Next/previous controls
function plusSlides(n, container) {
  showSlides((slideIndex += n), container);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function isImageFileName(filename) {
  // List of common image file extensions
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  // Extract the file extension from the filename
  const parts = filename.split(".");
  const extension = parts[parts.length - 1].toLowerCase();
  return imageExtensions.includes(extension);
}
function showSlides(n, container) {
  let i;

  let slides = container.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (slides.length > 0) {
    slides[slideIndex - 1].style.display = "block";
  }
}

//function for validating email addresses
function isValidEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
