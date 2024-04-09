const mongoose = require("mongoose");

const attachmentImageSchema = new mongoose.Schema({
  link: String,
  id: String,
});

const chatMassageSchema = mongoose.Schema(
  {
    chatUsers: {
      type: Array,
      required: true,
      trim: true,
    },
    message: { type: String, trim: true, default: "....." },
    attachmentImage: attachmentImageSchema,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ChatMassageModel = mongoose.model("message", chatMassageSchema);

module.exports = ChatMassageModel;
