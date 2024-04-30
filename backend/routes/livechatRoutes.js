const { Router } = require("express");
const { createMsg, getChatMsg } = require("../controllers/msg.controller");
const upload = require("../utils/multer");
const {
  createUser,
  getUsers,
  getParticularUser,
  initialCreateUser,
} = require("../controllers/livechatuser.controller");
const {
  checkAssistant,
  getAssistnats,
  createAssistnats,
  getAssistantSuggestions,
} = require("../controllers/livechatassistant.controller");
const multer = require("multer");
const path = require("path");

const liveChatRouter = Router();

//create new msg

const storageLiveChatAttachment = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/live_chat_attachements");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadLiveChatAttachement = multer({
  storage: storageLiveChatAttachment,
});
liveChatRouter.post(
  "/addmsg",
  uploadLiveChatAttachement.single("attachmentFile"),
  createMsg
);

//get chat between two users
liveChatRouter.post("/getmsg", getChatMsg);

//create user
liveChatRouter.post("/create-user/:id", createUser);

//get users
liveChatRouter.get("/get-users/:id", getUsers);

//get particular user
liveChatRouter.get("/get-puser/:id", getParticularUser);

//get Assistant
liveChatRouter.get("/get-assistants/:id", getAssistnats);

//create assistant user

const storageMain = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/assistant_images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadAssistantImage = multer({
  storage: storageMain,
});
liveChatRouter.post(
  "/create-assistant",
  uploadAssistantImage.single("assistantImage"),
  createAssistnats
);

//assistant check
liveChatRouter.patch("/check-assistant", checkAssistant);

//search assistant
liveChatRouter.get("/get-assistant/:userId/:value", getAssistantSuggestions);

module.exports = liveChatRouter;
