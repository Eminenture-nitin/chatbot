const UserModel = require("../model/UserSchema");
const DetailUserModel = require("../model/DetailUserSchema");
const OtpForgotPassSchema = require("../model/OtpForgotPassSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const Cloudinary = require("../utils/cloudinary");

// const upload = multer({ dest: "uploads/" });

//subfunction for password validations
function isPasswordValid(password) {
  if (password.length < 8) {
    return false;
  } else if (/[a-z]/.test(password) == false) {
    return false;
  } else if (/[A-Z]/.test(password) == false) {
    return false;
  } else if (/[0-9]/.test(password) == false) {
    return false;
  } else {
    return true;
  }
}
//subfunction for email validation
const isEmailValid = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

//user create
const createUser = async (req, res) => {
  const { email, password, website, termsAndConditions } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: "error",
      message: "Email is already registered",
    });
  }
  if (!isEmailValid(email)) {
    if (email.length == 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Email is not valid format" });
    }
  } else if (!isPasswordValid(password)) {
    return res.status(400).json({
      status: "error",
      message:
        "Password is not strong (must have 8 char, 1 uppercase, 1 symbol, 1 Number )",
    });
  } else if (!website) {
    return res
      .status(400)
      .json({ status: "error", message: "website is required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      website,
      termsAndConditions,
      pin: Math.floor(Math.random() * 900000) + 100000,
    });

    // const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
    await user.save();
    //send email after user register
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailDetails = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome To EMBot",
      text: `Thank you for choosing our platform! We're thrilled to welcome you aboard. Your registration has been successfully completed, and you're now part of our community. Feel free to explore all the features and services we offer. If you ever have any questions or need assistance, our dedicated support team is here to help you every step of the way. We're committed to providing you with a great experience, and we look forward to serving you. Once again, welcome to our platform!`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        return res.status(400).json({
          status: "error",
          message: "error while sending mail",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "User Register successfully",
        });
      }
    });
    // return res.status(200).json({
    //   status: "success",
    //   message: "User Register successfully",
    // });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

//user personal details - post data
const personalDetails = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      agreedToTerms,
      region,
      companyName,
      companySlogan,
    } = req.body;
    const userId = req.userId;

    //checking user exists or not
    let user = await DetailUserModel.findOne({ userId });
    let result;
    if (req.file) {
      result = await Cloudinary.uploader.upload(req.file.path);
    }
    if (user) {
      if (user.userImageId) {
        await Cloudinary.uploader.destroy(user.userImageId);
      }
      // User exists, updated the fields provided in the request body
      if (fullName) user.fullName = fullName;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (agreedToTerms !== undefined) user.agreedToTerms = agreedToTerms;
      if (region) user.region = region;
      if (req.file) user.userImage = result ? result.secure_url : "";
      if (req.file) user.userImageId = result ? result.public_id : "";
      if (companyName) user.companyName = companyName;
      if (companySlogan) user.companySlogan = companySlogan;

      await user.save();

      return res
        .status(200)
        .json({ status: "success", message: "Profile updated successfully" });
    } else {
      // if here User doesn't exist, we are creating a new user
      user = new DetailUserModel({
        userId,
        fullName,
        phoneNumber,
        companySlogan,
        companyName,
        agreedToTerms,
        region,
        userImage: result ? result.secure_url : "",
        userImageId: result ? result.public_id : "",
      });

      await user.save();

      return res
        .status(201)
        .json({ status: "success", message: "Profile created successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get User
const getUser = async (req, res) => {
  try {
    const id = req.userId;
    const user = await DetailUserModel.findOne({ userId: id });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    return res.status(200).send({
      status: "success",
      data: user,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Error Occured" });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!isEmailValid(email)) {
    if (email.length == 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Email is not valid" });
    }
  } else if (!password) {
    return res
      .status(400)
      .json({ status: "error", message: "password is required" });
  }
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      status: "success",
      message: "You have successfully logged in",
      user: {
        email: existingUser.email,
        website: existingUser.website,
        theme: existingUser.theme,
      },
      token,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Error Occured" });
  }
};

//forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!isEmailValid(email)) {
    if (email.length == 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    }
    return res
      .status(400)
      .json({ status: "error", message: "Email is not valid" });
  }
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    //here we check if we send otp already this user then just update otp and expire time
    const existingOtpDoc = await OtpForgotPassSchema.findOne({ email });

    let otp = Math.floor(1000 + Math.random() * 9000);

    if (!existingOtpDoc) {
      let otpDataForgotPass = new OtpForgotPassSchema({
        email,
        code: otp,
        expiresIn: new Date().getTime() + 300 * 1000,
      });
      let otpResponse = otpDataForgotPass.save();
    } else {
      existingOtpDoc.code = otp;
      existingOtpDoc.expiresIn = new Date().getTime() + 300 * 1000; // 5 minutes expiry
      await existingOtpDoc.save();
    }

    //email send
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailDetails = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        return res.status(400).json({
          status: "error",
          message: "error while sending mail",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "OTP set successfully! Check your email for the code.",
        });
      }
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

const changePassword = async (req, res) => {
  if (!isEmailValid(req.body.email)) {
    if (req.body.email.length == 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    }
    return res
      .status(400)
      .json({ status: "error", message: "Email is not valid" });
  } else if (!isPasswordValid(req.body.password)) {
    return res.status(400).json({
      status: "error",
      message:
        "Password is not strong (must have 8 char, 1 uppercase, 1 symbol, 1 Number",
    });
  } else if (req.body.otp.length == 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Otp is required" });
  }

  try {
    let data = await OtpForgotPassSchema.find({
      email: req.body.email,
      code: req.body.otp,
    });
    if (data.length > 0) {
      //console.log(data);
      let currentTime = new Date().getTime();
      let diff = data[0].expiresIn - currentTime;
      if (diff < 0) {
        return res
          .status(401)
          .json({ status: "error", message: "OTP Expired!" });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = await UserModel.findOne({ email: req.body.email });
        user.password = hashedPassword;
        user.save();
        return res.status(201).json({
          status: "success",
          message: "password changed Successfully",
        });
      }
    } else {
      return res.status(401).json({ status: "error", message: "Invalid Otp!" });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ status: "error", message: "Internal error occured" });
  }
};

//api for widegt getting admin details like logo company name and Slogan
const getUserDataforWidget = async (req, res) => {
  try {
    const userId = req.params.id;
    let adminMain = await UserModel.findOne({ _id: userId });
    if (!adminMain) {
      return res
        .status(404)
        .json({ status: "error", message: "Admin not found!" });
    } else {
      let userDetails = await DetailUserModel.findOne({ userId });
      return res.status(200).json({
        status: "success",
        data: {
          theme: adminMain.theme,
          userImage: userDetails.userImage,
          companySlogan: userDetails.companySlogan,
          companyName: userDetails.companyName,
          email: adminMain?.email,
        },
      });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ status: "error", message: "Internal error occured" });
  }
};

// Update User Theme
const updateUserTheme = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    console.log(req.body.theme);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    user.theme = req.body.theme;
    user.save();
    return res.status(200).send({
      status: "success",
      message: "Theme Updated successfully!",
      data: user,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Error Occured" });
  }
};
module.exports = {
  createUser,
  getUser,
  personalDetails,
  loginUser,
  forgotPassword,
  changePassword,
  getUserDataforWidget,
  updateUserTheme,
};
