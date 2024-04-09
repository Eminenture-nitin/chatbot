const { Router } = require("express");
const auth = require("../middlewares/auth");
const {
  getNotifications,
  addNotification,
  updateNotificationStatus,
} = require("../controllers/notification.controller");
const notificationRouter = Router();

//get notifications
notificationRouter.get("/get-notifications/:id", auth, getNotifications);

//add notification
notificationRouter.post("/add-notification", auth, addNotification);

//update notificaion
notificationRouter.patch(
  "/update-notification/:id",
  auth,
  updateNotificationStatus
);

module.exports = notificationRouter;
