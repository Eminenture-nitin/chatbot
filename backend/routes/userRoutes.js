const { Router } = require("express");
const upload = require("../utils/multer");
const {
  createUser,
  getUser,
  personalDetails,
  loginUser,
  forgotPassword,
  changePassword,
  getUserDataforWidget,
  updateUserTheme,
} = require("../controllers/user.controller");

const auth = require("../middlewares/auth");

const userRouter = Router();

//create user
userRouter.post("/sign-up", createUser);

//get user - private route
userRouter.get("/get-user", auth, getUser);

//create detail user info - private route
userRouter.post(
  "/personal-details",
  auth,
  upload.single("userImage"),
  personalDetails
);

//login user
userRouter.post("/login", loginUser);

//forgot password - if user forgot there password
userRouter.post("/forgot-password", forgotPassword);

//changes password
userRouter.post("/change-password", changePassword);

//logout
// userRouter.post("/logout", auth, logout);

//getUserDataforWidget
userRouter.get("/get-widegt-admin-data/:id", getUserDataforWidget);

//udpate User theme
userRouter.patch("/update-user-theme/:id", updateUserTheme);
module.exports = userRouter;
