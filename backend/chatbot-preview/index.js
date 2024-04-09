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

  console.log("useremai", userEmail);

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
  ChatBotIconText.innerText = "Chat with us";
  ChatBotIconText.className = "ChatBotIconText";
  let chatbotIcon = document.createElement("div");
  chatbotIcon.className = "chatbot-icon animate-fade-right ripple-effect";
  chatbotIcon.style.zIndex = "999999999";
  let chatbotIconSymbol = document.createElement("i");
  chatbotIconSymbol.className = "fa-solid fa-chalkboard fa-lg";

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

  let heading = document.createElement("h2");
  heading.innerHTML = `Chat with ${adminData.companyName}`;
  heading.className = "heading";
  chatInterfaceHeader.append(Logo, heading);

  let alertDiv = document.createElement("div");
  alertDiv.className = "alertDiv fade-down";
  alertDiv.style.display = "none";
  alertDiv.id = "alertDivId";
  let alertInnerDiv = document.createElement("div");
  alertInnerDiv.className = "alertInnerDiv";
  let alertIcon = document.createElement("i");
  alertIcon.className = "fa-solid fa-spinner fa-spin-pulse fa-lg";
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
      <div class="sub-btns">
          <i class="fa-regular fa-face-smile"></i>
      </div>
      
      <div class="chat-input">
          <input type="text" name="bot" id="triggerInput" placeholder="Your massage" required>
      </div>
      <div >
          <button type="submit" id="handleSubmit" class="submit-btn">
              <i class="fa-solid fa-paper-plane"></i>
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
      <h2 >Hi there 👋 <br>How can we help?</h2>
    </div>
    <div id="chatBoxIdeal" class="chatBoxIdeal">
    <div>
      <h4>Send us a message</h4>
      <p>Bot chat or fill form for live chat</p>
    </div>
    <div>
      <button id="sendMessageBtn">
        <svg class="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
        </svg>
      </button>
    </div>
  </div>
  </div>
  <div class="form-container">
    <div class="icon-container">
        <i class="fa-regular fa-circle-user fa-fade fa-lg"></i>
    </div>
    <form id="introductionForm">
      <label for="email">Please introduce yourself:</label>
      <div class="input-container">
        <input type="email" id="introductionForm_email" name="email" placeholder="Your Email" required>
        <button id="submitfromBtn" type="submit"><i class="fas fa-arrow-right"></i></button>
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
    } else {
      chatInterface.style.display = "none";
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
  const loadingIndicator = document.createElement("i");
  loadingIndicator.className = "fa-solid fa-ellipsis fa-fade";

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
      let userIcon = document.createElement("i");
      userIcon.className = "fa-solid fa-circle-user";
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
      let userIconResponse = document.createElement("i");
      userIconResponse.className = "fa-solid fa-robot";
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
      attachementImgDownloadBtn.innerHTML = `<i class="fa-solid fa-download"></i>`;
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
document.getElementById("chatBoxIdeal").addEventListener("click", () => {
  // console.log("hello");
  document.getElementById("IIFContainer").style.display = "none";
});

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
