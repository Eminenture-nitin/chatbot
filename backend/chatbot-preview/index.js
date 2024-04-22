let hashedId = "c3hiAVVQRiQsYlBWU0xwdGdUWQBGdixj";
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

// console.log("userId", userId);

let alertText = "loading";
let responseDataBOT = [
  {
    id: 1,
    responseMsg: "Hello 👋 how can i assist you?",
    attachmentImage: "",
    suggestedTrigger: [
      "Tell me about your services?",
      "Tell me about your comapany?",
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
    responseMsg: "please confirm your Email",
    attachmentImage: "",
    suggestedTrigger: [],
    triggerText: ["Yes, Please connect"],
  },
  {
    id: 3,
    responseMsg: "Thank you for chatting with us, Have a wonderful day!",
    attachmentImage: "",
    suggestedTrigger: [
      "Tell me about your services?",
      "Tell me about your comapany?",
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
    attachmentImage: "",
    suggestedTrigger: [
      "Tell me about your services?",
      "Tell me about your comapany?",
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
    triggerText: ["Would you like to connect with us?"],
    suggestedTrigger: ["Yes, Please connect", "Not Yet"],
  },
  {
    id: 4,
    responseMsg: "Would you like to connect with us?",
    attachmentImage: "",
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
        if (item.initialResponse == 1) {
          mainChatData.unshift(item);
        } else if (item.initialResponse == 2) {
          mainChatData.splice(1, 0, item);
        } else if (item.initialResponse == 3) {
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
  const user__id = getCookie("widget_user_id");
  const userEmail = getCookie("widget_user_email");

  // console.log("useremai", userEmail);

  const throttledFunction = throttle(getInitialMsg, 5000);
  throttledFunction(userId, user__id);

  // getInitialMsg(userId);
  //throttlefunc(userId);
  if (user__id) {
    const payload = { from: user__id };
    getMsg(payload);

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
    console.log(data.data);
    setCookie("adminData", JSON.stringify(data.data), 365);
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
    mainChatData.push({
      responseMsg: arrivalMsg.message,
      attachmentImage: arrivalMsg.attachmentImage.link,
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
  chatbotIconSymbol.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 0 0-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 0 0 5.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56c-.18-3-.15-6 .06-9c.06-.84.72-1.47 1.56-1.53c2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53c.24 3 .24 6 .06 9c-.12.93-.9 1.62-1.83 1.59h-3.15l-6 3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19c.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 0 0-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24m-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 .33.18.63.48.78c1.62.78 3.42 1.2 5.22 1.26c1.8-.06 3.6-.48 5.22-1.26c.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.65.65 0 0 0-.87-.36c-1.5.66-3.12 1.02-4.77 1.05c-1.65-.03-3.27-.42-4.77-1.08a.6.6 0 0 0-.24-.06"/></svg>`;
  chatbotIcon.appendChild(chatbotIconSymbol);
  ChatBotIconDiv.append(ChatBotIconText, chatbotIcon);

  let chatInterface = document.createElement("div");
  chatInterface.className = "chat-interface animate-fade-right";
  chatInterface.id = "chat-interface";
  let chatInterfaceInnerDiv = document.createElement("div");
  chatInterfaceInnerDiv.className = "chatInterfaceinnerDiv";

  //Chatbot Header
  let adminData = getCookie("adminData");
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
<div class="chat-form" >
  <form class="form" id="sendMsgForm">
      <div class="sub-btns submitfromBtnpiy submitfromBtnpiy2">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32"><path fill="black" d="M12 15a2 2 0 1 0 0-4a2 2 0 0 0 0 4m10-2a2 2 0 1 1-4 0a2 2 0 0 1 4 0M9.553 19.106a1 1 0 0 1 1.338.44l.003.006l.034.058c.035.057.093.146.177.259c.169.225.44.536.832.85C12.71 21.337 13.993 22 16 22s3.29-.663 4.063-1.28c.393-.315.664-.626.832-.851a3 3 0 0 0 .211-.317l.004-.007a1 1 0 0 1 1.785.902v.001l-.002.002v.002l-.004.006l-.008.015a3 3 0 0 1-.1.175a5 5 0 0 1-.285.42a6.8 6.8 0 0 1-1.184 1.213C20.21 23.163 18.493 24 16 24s-4.21-.837-5.312-1.72a6.8 6.8 0 0 1-1.183-1.211a5 5 0 0 1-.386-.596l-.008-.015l-.003-.006l-.001-.003l-.001-.002a1 1 0 0 1 .447-1.341M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2M4 16C4 9.373 9.373 4 16 4s12 5.373 12 12s-5.373 12-12 12S4 22.627 4 16"/></svg>
      </div>
      
      <div class="chat-input">
          <input type="text" name="bot" id="triggerInput" placeholder="Your massage" required>
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
      <div >Hi there 👋 <br>How can we help?</div>
    </div>
    <div id="chatBoxIdeal" class="chatBoxIdeal">
    <div class="botChatPASSpan">
      <h4>Get Support</h4>
      <span>Enter your email for bot and live chat access.</span>
    </div>
    <div>
      <button id="sendMessageBtn">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="black" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="m17 14.5l-5 5l-5-5"/><path d="M12 19.5v-10c0-1.667-1-5-5-5" opacity="0.5"/></g></svg>
      </button>
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
        <input type="email" id="introductionForm_email" name="email" placeholder="Your Email" required>
        <button id="submitfromBtn" type="submit" class="submitfromBtnpiy">
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
      const user__id = getCookie("widget_user_id");
      if (!user__id) {
        IIFContainer.style.display = "block";
      } else {
        IIFContainer.style.display = "none";
      }
      setTimeout(() => {
        document.getElementById(
          "chatbotIconSymbol"
        ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 15 15"><path fill="white" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"/></svg>`;
      }, 100);
    } else {
      chatInterface.style.display = "none";
      setTimeout(() => {
        document.getElementById(
          "chatbotIconSymbol"
        ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 0 0-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 0 0 5.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56c-.18-3-.15-6 .06-9c.06-.84.72-1.47 1.56-1.53c2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53c.24 3 .24 6 .06 9c-.12.93-.9 1.62-1.83 1.59h-3.15l-6 3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19c.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 0 0-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24m-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 .33.18.63.48.78c1.62.78 3.42 1.2 5.22 1.26c1.8-.06 3.6-.48 5.22-1.26c.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.65.65 0 0 0-.87-.36c-1.5.66-3.12 1.02-4.77 1.05c-1.65-.03-3.27-.42-4.77-1.08a.6.6 0 0 0-.24-.06"/></svg>`;
      }, 100);
      //setCookie("mainChatData", mainChatData, 365);
    }
    getChatBotData(userId);
  });

  chatbotContainer.appendChild(ChatBotIconDiv);
  chatbotContainer.appendChild(chatInterface);

  document.body.appendChild(chatbotContainer);
  chattingData();
  triggerMsg();
};
function submitFunction(e, subtriggerValue) {
  e.preventDefault();
  getChatBotData(userId);
  let triggerInputTag = document.getElementById("triggerInput");
  let triggerValue = triggerInputTag.value;
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
        const API_PATH = `${host_URL}/live/create-user`;
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
      const widget_user_id =
        localStorage.getItem("widget_user_id") || getCookie("widget_user_id");
      if (widget_user_id) {
        addMsg(triggerValue);
      }
      mainChatData.push({ replaytext: triggerValue });
    }
  } else {
    let lowercaseMsg;
    if (subtriggerValue) {
      lowercaseMsg = subtriggerValue.toLowerCase();
    } else {
      lowercaseMsg = triggerValue.toLowerCase();
    }
    const widget_user_id =
      localStorage.getItem("widget_user_id") || getCookie("widget_user_id");
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
          "Tell me about your comapany?",
          "I need help with a service",
        ],
      };
      mainChatData.push(defaultResponse);
      setTimeout(() => {
        addBotFromMsgmDashbord(defaultResponse.responseMsg);
      }, 2000);
    }

    if (matchingResponse?.responseMsg == "please confirm your Email") {
      let inputValue = document.getElementById("triggerInput");
      // console.log(inputValue);
      inputValue.type = "email";
      inputValue.addEventListener("focus", function () {
        // Set the input value to the placeholder text when focused
        inputValue.value = getCookie("widget_user_email");
      });
      inputValue.setAttribute("placeholder", getCookie("widget_user_email"));
      inputValue.setAttribute("name", "liveChat");
      //console.log(inputValue);
    }
    if (matchingResponse?.replaytext == "end this conversation") {
      let inputTag = document.getElementById("triggerInput");
      inputTag.setAttribute("name", "bot");
      document.getElementById("alertDivId").style.display = "none";
      socket.off("checkAssitJoinedStatus");
      inputTag.addEventListener("focus", function () {
        inputTag.value = "";
      });
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
            "Tell me about your comapany?",
            "What do you offer?",
          ],
        });
        const widget_user_id =
          localStorage.getItem("widget_user_id") || getCookie("widget_user_id");
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
        attachmentImage,
        suggestedTrigger,
        urlLabels,
        multipleRes,
        responsesData,
      },
      index
    ) => {
      //console.log(attachmentImage, "attachmentImage");
      //trigger
      let triggerDiv = document.createElement("div");
      triggerDiv.className = "trigger";

      let triggerInnerDiv = document.createElement("div");
      let userIcon = document.createElement("div");
      userIcon.className = "submitfromBtnpiy2 sbtfUserSpecial";
      userIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 50 50"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke="#344054" d="M25 31.25a8.333 8.333 0 1 0 0-16.667a8.333 8.333 0 0 0 0 16.667"/><path stroke="#344054" d="M29.52 29.896a8.23 8.23 0 0 1-9.04 0a14.58 14.58 0 0 0-8.917 8.166a18.75 18.75 0 0 0 26.687.188l.188-.188a14.6 14.6 0 0 0-8.917-8.166"/><path stroke="#306cfe" d="M43.75 25c0-10.355-8.395-18.75-18.75-18.75S6.25 14.645 6.25 25S14.645 43.75 25 43.75S43.75 35.355 43.75 25"/></g></svg>`;
      const triggerSpan = document.createElement("span");
      triggerSpan.innerText = replaytext;
      if (replaytext) {
        triggerInnerDiv.append(userIcon, triggerSpan);
        triggerDiv.appendChild(triggerInnerDiv);
      }

      //response
      let ResponseDiv = document.createElement("div");
      ResponseDiv.className = "response";
      ResponseDiv.innerHTML = "";
      let ResponseInnerDiv = document.createElement("div");
      ResponseInnerDiv.className = "innerDivResponse";
      let userIconResponse = document.createElement("div");
      userIconResponse.className = "submitfromBtnpiy2 sbfbt2SpecialBot";
      userIconResponse.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 48 48" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M21 25c0-1.654-1.346-3-3-3s-3 1.346-3 3 1.346 3 3 3 3-1.346 3-3zm-3 1a1.001 1.001 0 0 1 0-2c.551 0 1 .449 1 1s-.449 1-1 1zM30 22c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0 4a1.001 1.001 0 0 1 0-2c.551 0 1 .449 1 1s-.449 1-1 1zM28.543 33.91c-2.815 1.447-6.271 1.447-9.086 0a1 1 0 1 0-.914 1.78c1.669.857 3.556 1.311 5.457 1.311s3.788-.453 5.457-1.311a1.001 1.001 0 0 0-.914-1.78z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M45 22h-3v-3c0-2.757-2.243-5-5-5H25V9.858c1.72-.447 3-2 3-3.858 0-2.206-1.794-4-4-4s-4 1.794-4 4c0 1.858 1.28 3.411 3 3.858V14H11c-2.757 0-5 2.243-5 5v3H3c-1.654 0-3 1.346-3 3v9c0 1.654 1.346 3 3 3h3v3c0 2.757 2.243 5 5 5h26c2.757 0 5-2.243 5-5v-3h3c1.654 0 3-1.346 3-3v-9c0-1.654-1.346-3-3-3zM22 6c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2-2-.897-2-2zM3 35c-.551 0-1-.448-1-1v-9c0-.551.449-1 1-1h3v11zm37 5c0 1.654-1.346 3-3 3H11c-1.654 0-3-1.346-3-3V19c0-1.654 1.346-3 3-3h26c1.654 0 3 1.346 3 3zm6-6c0 .552-.449 1-1 1h-3V24h3c.551 0 1 .449 1 1z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg>`;
      let ResponseTextDiv = document.createElement("div");
      ResponseTextDiv.className = "responseTextDiv";
      const ResposeSpan = document.createElement("span");
      ResposeSpan.innerText = responseMsg;
      const loadingSpan = document.createElement("span");
      loadingSpan.append(loadingIndicator);
      let attachementImgDiv = document.createElement("div");
      attachementImgDiv.style.position = "relative";
      let attachementImg = document.createElement("img");
      attachementImg.src = attachmentImage;
      attachementImg.className = "attachmentImg";
      let attachementImgDownloadBtn = document.createElement("button");
      attachementImgDownloadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="white" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>`;
      attachementImgDownloadBtn.className = "attachementImgDownloadBtn";
      attachementImgDownloadBtn.id = "attachementImgDownloadBtn";
      attachementImgDownloadBtn.addEventListener("click", () => {
        fetch(attachmentImage)
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
      attachementImgDiv.append(attachementImg, attachementImgDownloadBtn);

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
              socket.emit("logoutAutomatically", {
                adminId: userId,
                joinedExecutiveEmail: localStorage.getItem(
                  "joinedAssistantEmail"
                ),
              });
            } else {
              e.preventDefault();
              submitFunction(e, elem);
            }
          });
          Subtriggers.appendChild(button);
        });
      }

      ResponseTextDiv.appendChild(ResposeSpan);
      if (attachmentImage) {
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
          const icon = document.createElement("i");
          icon.className = "fa-solid fa-arrow-up-right-from-square";
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
  setTimeout(() => {
    socket.emit("sendMsg", {
      to: localStorage.getItem("joinedAssistantId") || userId,
      from:
        localStorage.getItem("widget_user_id") || getCookie("widget_user_id"),

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
      from:
        localStorage.getItem("widget_user_id") || getCookie("widget_user_id"),
      message: TextMsgdata,
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
    data?.projectMessages?.forEach((elem) => {
      if (elem.myself === false) {
        mainChatData.push({
          responseMsg: elem.message,
          attachmentImage: elem.attachmentImage.link,
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
  const API_PATH = `${host_URL}/live/create-user`;
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
      setCookie("widget_user_id", data?.user?._id, 365);
      setTimeout(() => {
        setCookie("widget_user_email", data?.user?.userEmail, 365);
      }, 4000);
      document.getElementById("IIFContainer").style.display = "none";

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

// Function to set a cookie
function setCookie(name, value, daysToExpire) {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// Function to get the value of a cookie by name
function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name + "=") == 0) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return "";
}

function isCookieFieldPresent(fieldName) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(fieldName + "=") === 0) {
      return true; // Field is present in cookies
    }
  }
  return false; // Field is not present in cookies
}

document
  .getElementById("introductionForm")
  .addEventListener("submit", InitialUserRegisterFrom);

function InitialUserRegisterFrom(e) {
  e.preventDefault();
  let emailInput = document.getElementById("introductionForm_email");
  //console.log(emailInput.value);
  getInitialUserLocation(emailInput.value);
}

const endLiveChatfun = document.getElementById("ENdLiveChatButton");

async function addBotFromMsgmDashbord(TextMsgdata) {
  setTimeout(() => {
    socket.emit("sendMsg", {
      to: localStorage.getItem("widget_user_id") || getCookie("widget_user_id"),
      from: localStorage.getItem("joinedAssistantId") || userId,
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
      to: localStorage.getItem("widget_user_id") || getCookie("widget_user_id"),
      from: localStorage.getItem("joinedAssistantId") || userId,
      message: TextMsgdata,
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
    socket.emit("addUser", getCookie("widget_user_id"));
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
    }, 2000);

    mainChatData.push({
      responseMsg:
        "Assistant Left the Live Chat Session. Please continue with bot chat.",
      suggestedTrigger: [
        "Tell me about your services?",
        "Tell me about your comapany?",
        "What do you offer?",
      ],
    });
    chattingData();
  });
}, 4000);

//click to botchat
// document.getElementById("chatBoxIdeal").addEventListener("click", () => {
//   // console.log("hello");
//   document.getElementById("IIFContainer").style.display = "none";
// });

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
    sliderImgTag.src = elem?.attachmentImage;

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
