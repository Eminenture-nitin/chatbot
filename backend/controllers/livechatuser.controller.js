const LiveChatUserModel = require("../model/LiveChatUserSchema");
const OverAllPerformaceModel = require("../model/OverAllPerformanceSchema");
const nodemailer = require("nodemailer");
const createUser = async (req, res) => {
  try {
    const { userEmail, userName, location, visitedPage, status, userId } =
      req.body;
    const adminId = req.params.id;
    const user = await LiveChatUserModel.findOne({
      userEmail,
      userId: adminId,
    });
    if (user) {
      // User already exists, update location, visitedPage, and timestamp
      user.location = location; // New location value
      user.visitedPage = visitedPage; // New visitedPage value
      user.updatedAt = new Date(); // Timestamp
      user.status = true;
      user.save();

      const performanceData = await OverAllPerformaceModel.findOne({
        _id: "658538fc59803311c99355fe",
      });
      const keyword = "Total_Users_Queries";
      const keyword2 = "Total_Chatbot_Sessions";
      const keywordFCR = "First_Contact_Resolution";
      if (performanceData) {
        performanceData[keyword2] += 1;
        performanceData[keyword] = Math.floor(
          (performanceData[keyword2] / 100) * 80
        );
        performanceData[keywordFCR] = Math.floor(
          0.8 * performanceData[keyword]
        );

        performanceData.save();
      }

      return res.status(200).send({
        status: "success",
        message: "User updated successfully",
        user: user,
      });
    } else {
      // User doesn't exist, create a new user
      const createUser = await LiveChatUserModel.create({
        userEmail,
        userName,
        location,
        visitedPage,
        status: true,
        userId,
      });

      createUser.save();
      if (createUser) {
        const performanceData = await OverAllPerformaceModel.findOne({
          _id: "658538fc59803311c99355fe",
        });
        const keyword = "Total_Unique_Users";
        const keyword2 = "Total_Chatbot_Sessions";
        const keyword3 = "Total_Users_Queries";
        const keywordFCR = "First_Contact_Resolution";

        if (performanceData) {
          performanceData[keyword] += 1;
          performanceData[keyword2] += 1;
          performanceData[keyword3] = Math.floor(
            (performanceData[keyword2] / 100) * 80
          );
          performanceData[keywordFCR] = Math.floor(
            0.8 * performanceData[keyword3]
          );
          performanceData.save();
        } else {
          console.log("keyword Not found");
        }
      }
      return res.status(200).send({
        status: "success",
        message: "User registered successfully",
        user: createUser,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

//getting users
const getUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await LiveChatUserModel.find({ userId }).sort({
      updatedAt: -1,
    });
    res.status(200).send({ status: "success", data: users });
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

//get particular user
const getParticularUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await LiveChatUserModel.findOne({ _id });

    res.status(200).send({
      status: "success",
      data: {
        userEmail: user.userEmail,
        _id: user._id,
        joinedExecutive: user.joinedExecutive,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

const chatTranscriptSendToMail = async (req, res) => {
  try {
    const { mainChatData, userEmail } = req.body;
   // console.log(req.body);
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let currentDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    let mailDetails = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Chat Transcript: Conversation Summary - ${currentDate}`,
      text: ``,
    };

    let chatDataHtml = "";
    mainChatData.forEach((elem) => {
      if (elem?.responseMsg?.length > 0) {
        chatDataHtml += `[${
          elem?.assiMsgData?.Assi_userName || elem?.assiMsgData?.userName
            ? elem?.assiMsgData?.Assi_userName || elem?.assiMsgData?.userName
            : "EmBot"
        }]: ${elem.responseMsg}\n`;
      }
      if (elem?.replaytext?.length > 0) {
        chatDataHtml += `[you]: ${elem.replaytext}\n`;
      }
    });

    // Append the chat data HTML to the text property of mailDetails
    mailDetails.text += "\n\nChat History:\n" + chatDataHtml;
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          status: "error",
          message: "error while sending chat transcript mail",
        });
      } else {
        console.log("Chat Transcript Sent Successfully!!");
        return res.status(200).send({
          status: "success",
          message: "Chat Transcript Sent Successfully!!",
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  createUser,
  getUsers,
  getParticularUser,
  chatTranscriptSendToMail,
};
