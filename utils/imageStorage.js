const path = require("path");
const cloudinary = require("cloudinary").v2;
const DatauriParser = require("datauri/parser");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToStorage = async (file, user) => {
  const parser = new DatauriParser();

  const base64 = parser.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );

  const content = base64.content;
  const result = await cloudinary.uploader.upload(content, {
    public_id: `${user.username}-${user._id}`,
  });

  return result;
};

const deleteImageFromStorage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadImageToStorage, deleteImageFromStorage };
