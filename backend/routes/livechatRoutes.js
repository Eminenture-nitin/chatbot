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

const liveChatRouter = Router();

//create new msg
liveChatRouter.post("/addmsg", upload.single("attachmentImage"), createMsg);

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

//create user
liveChatRouter.post("/create-assistant", createAssistnats);

//assistant check
liveChatRouter.patch("/check-assistant", checkAssistant);

//search assistant
liveChatRouter.get("/get-assistant/:userId/:value", getAssistantSuggestions);

module.exports = liveChatRouter;
