const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    userInfo: { type: Object },
    notificationMsg: { type: String, require: true },
    seenStatus: { type: Boolean, default: false },
    adminId: { type: mongoose.Schema.Types.ObjectId, require: true },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("notification", notificationSchema);

module.exports = NotificationModel;
