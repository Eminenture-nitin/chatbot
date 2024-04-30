const ChatMassageModel = require("../model/ChatMassageSchema");

const createMsg = async (req, res) => {
  
  try {
    const { from, to, message, type, assiMsgData } = req.body;
    let result;
    if (req.file) {
      // result = await Cloudinary.uploader.upload(req.file.path);
      result = req.file.filename;
    }
    const newMessage = await ChatMassageModel.create({
      message: message,
      chatUsers: [from, to],
      sender: from,
      attachmentFile: result ? result : "",
      type: type,
      assiMsgData: assiMsgData ? JSON.parse(assiMsgData) : null,
    });
    if (newMessage) {
      return res.status(200).json({
        status: "success",
        message: "message added successfully",
        newMessage,
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "failed to add message to the databse",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

const getChatMsg = async (req, res) => {
  try {
    const { from, to } = req.body;
    if (from && to) {
      const newMsg = await ChatMassageModel.find({
        chatUsers: { $all: [from, to] },
      }).sort({ updatedAt: 1 });
      const projectMessages = newMsg.map((msg) => {
        return {
          myself: msg.sender.toString() == from,
          message: msg.message,
          attachmentFile: msg.attachmentFile,
          type: msg.type,
          assiMsgData: msg.assiMsgData ? msg.assiMsgData : null,
        };
      });
      return res.status(200).json({ status: "success", projectMessages });
    } else if (from) {
      // console.log(from, "form");
      const newMsg = await ChatMassageModel.find({
        chatUsers: { $all: [from] },
      });
      const projectMessages = newMsg.map((msg) => {
        return {
          myself: msg.sender.toString() == from,
          message: msg.message,
          attachmentFile: msg.attachmentFile,
          type: msg.type,
          assiMsgData: msg.assiMsgData ? msg.assiMsgData : null,
        };
      });
      return res.status(200).json({ status: "success", projectMessages });
    } else {
      const newMsg = await ChatMassageModel.find({
        chatUsers: { $all: [to] },
      });
      const projectMessages = newMsg.map((msg) => {
        return {
          myself: msg.sender.toString() !== to,
          message: msg.message,
          attachmentFile: msg.attachmentFile,
          type: msg.type,
          assiMsgData: msg.assiMsgData ? msg.assiMsgData : null,
        };
      });
      return res.status(200).json({ status: "success", projectMessages });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};
module.exports = { createMsg, getChatMsg };
