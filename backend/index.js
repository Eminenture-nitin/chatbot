const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/userRoutes");
const chatbotRouter = require("./routes/chatbotRoutes");
const previewRouter = require("./routes/previewRoute");
const liveChatRouter = require("./routes/livechatRoutes");
const socket = require("socket.io");
const LiveChatUserModel = require("./model/LiveChatUserSchema");
const notificationRouter = require("./routes/notificationRoutes");
const NotificationModel = require("./model/NotificationSchema");
const OverAllPerformaceModel = require("./model/OverAllPerformanceSchema");
const performanceRouter = require("./routes/performanceRoutes");
const newTRRouter = require("./routes/newTRRoutes");
const imageRouter = require("./routes/imageRoutes");
const path = require("path");

require("dotenv").config();
const app = express(); //Server

//middelwares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
app.use("/auth", userRouter);
app.use("/chatbot", chatbotRouter);
app.use("/preview", previewRouter);
app.use("/live", liveChatRouter);
app.use("/notify", notificationRouter);
app.use(performanceRouter);
app.use("/auth", newTRRouter);
app.use("/img", imageRouter);

//Read Data or Get Data
app.get("/", (req, res) => {
  res.send({ status: "success", msg: "Welcome to Homepage" });
});
// Wiget API
app.get("/widget/:adminId", (req, res) => {
  const EMChatBotAdminId = req.params.adminId;
  // Here you can implement logic to fetch data based on the ID
  // For demonstration, let's send back JavaScript code to append elements
  const scriptContent = `
      (function() {
          var divElement = document.createElement('div');
          divElement.id = 'EMChatBotRoot';
          document.body.appendChild(divElement);

          var linkElement = document.createElement('link');
          linkElement.rel = 'stylesheet';
          linkElement.href = 'https://embot-react-widget.vercel.app/static/css/main.ed372d55.css';
          document.head.appendChild(linkElement);

          var scriptElement = document.createElement('script');
          scriptElement.src = 'https://embot-react-widget.vercel.app/static/js/main.3e5d2709.js';
          document.body.appendChild(scriptElement);

          // Store admin-related data in global window object
          window.EMChatBotData = {
              EMChatBotAdminId: '${EMChatBotAdminId}',
          };
      })();
  `;

  // Respond with JavaScript code
  res.set("Content-Type", "application/javascript").send(scriptContent);
});

app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT;

const server = app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("ERROR: " + e);
  }
  console.log(`server started on http://localhost:${PORT}`);
});

//socket io
const io = socket(server, {
  cors: {
    origin: "*",
    credential: true,
  },
});

//store online all online user inside this map
global.onlineUsers = new Map();

//store admins
global.onlineAdmins = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket.id);
  });
  socket.on("sendMsg", (data) => {
    // console.log(data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data);
    }
  });

  socket.on("updateUserAssistantStatus", async (userId) => {
    // console.log(userId, "id");
    const user = await LiveChatUserModel.findOne({ _id: userId });
    if (user.joinedExecutive.status == false) {
      const data = {
        status: false,
        msg: "Assistant Not joined Yet Please wait",
        user,
      };
      socket.emit("checkAssitJoinedStatus", data);
    } else {
      const data = { status: true, msg: "Assistant joined", user };
      socket.emit("checkAssitJoinedStatus", data);
    }
  });
  socket.on("stopUpdateUserAssistantStatus", () => {
    socket.off("updateUserAssistantStatus");
  });
  socket.on("adminConnect", (adminId) => {
    onlineAdmins.set(adminId, socket.id);
  });
  socket.on("notifications", async (notifyData) => {
    // console.log(notifyData, "nw");

    const sendAdminDashbordSocket = onlineAdmins.get(notifyData.adminId);
    // console.log(notifyData, "nw", sendAdminDashbordSocket);
    if (sendAdminDashbordSocket) {
      const notificaionData = await NotificationModel.create(notifyData);
      socket
        .to(sendAdminDashbordSocket)
        .emit("newNotification", notificaionData);
    }
  });

  socket.on("JoinedAssistantDirectly", (data) => {
    const sendUserSocket = onlineUsers.get(data.userId);
    //console.log(sendUserSocket);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("AssistantJoined", data);
    }
  });

  socket.on("AssistantLogoutChat", (data) => {
    // console.log(data);
    const sendUserSocket = onlineUsers.get(data.userId);
    // console.log(sendUserSocket);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("AssistantLogoutSuccessfully", data);
    }
  });

  //socket for track performance
  socket.on("trackPerformance", async (data) => {
    const performanceData = await OverAllPerformaceModel.findOne({
      _id: "658538fc59803311c99355fe",
    });
    // console.log(performanceData, "track p before");
    if (performanceData && performanceData[data.keyword] !== undefined) {
      performanceData[data.keyword] += 1;
      performanceData.save();
    } else {
      console.log("keyword Not found");
    }
  });

  //socket for logout automatically to admin
  socket.on("logoutAutomatically", (data) => {
    const sendAdminDashbordSocketLogout = onlineAdmins.get(data.adminId);
    //console.log(data,"data");
    console.log(sendAdminDashbordSocketLogout, "sendAdminDashbordSocketLogout");
    if (sendAdminDashbordSocketLogout) {
      socket
        .to(sendAdminDashbordSocketLogout)
        .emit("autoAssistantloggedOut", data);
    }
  });
});
