const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_V2,
  api_key: process.env.API_KEY_V2,
  api_secret: process.env.API_SECRET_V2,
});
module.exports = cloudinary;
