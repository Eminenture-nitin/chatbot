const ChatMassageModel = require("../model/ChatMassageSchema");
const Cloudinary = require("../utils/cloudinary");

const createMsg = async (req, res) => {
  try {
    const {
      from,
      to,
      message,
      type,
      assiMsgData,
      assiUnavailableFromData,
      quickInquiryFromData,
      responsesData,
    } = req.body;
    let result;
    if (req.file) {
      result = await Cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
    }
    const newMessage = await ChatMassageModel.create({
      message: message,
      chatUsers: [from, to],
      sender: from,
      attachmentFile: result ? result.secure_url : "",
      attachmentFileId: result ? result.public_id : "",
      type: type,
      assiMsgData: assiMsgData ? JSON.parse(assiMsgData) : null,
      assiUnavailableFromData: assiUnavailableFromData
        ? assiUnavailableFromData
        : null,
      quickInquiryFromData: quickInquiryFromData ? quickInquiryFromData : null,
      responsesData: responsesData ? responsesData : [],
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
          assiUnavailableFromData: msg.assiUnavailableFromData
            ? msg.assiUnavailableFromData
            : null,
          quickInquiryFromData: msg.quickInquiryFromData
            ? msg.quickInquiryFromData
            : null,
          responsesData: msg.responsesData ? msg.responsesData : [],
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
          assiUnavailableFromData: msg.assiUnavailableFromData
            ? msg.assiUnavailableFromData
            : null,
          quickInquiryFromData: msg.quickInquiryFromData
            ? msg.quickInquiryFromData
            : null,
          responsesData: msg.responsesData ? msg.responsesData : [],
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
          assiUnavailableFromData: msg.assiUnavailableFromData
            ? msg.assiUnavailableFromData
            : null,
          quickInquiryFromData: msg.quickInquiryFromData
            ? msg.quickInquiryFromData
            : null,
          responsesData: msg.responsesData ? msg.responsesData : [],
        };
      });
      return res.status(200).json({ status: "success", projectMessages });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

const deleteAllMessagesFunc = async (req, res) => {
  try {
    const sender = req.params.id;
    console.log(sender, "sender");
    const deletedMessages = await ChatMassageModel.deleteMany({
      chatUsers: { $in: [sender] },
    });
    return res.status(200).json({
      status: "success",
      message: "All messages deleted successfully!!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

module.exports = { createMsg, getChatMsg, deleteAllMessagesFunc };
