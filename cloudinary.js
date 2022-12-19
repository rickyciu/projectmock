const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "diswgevbu",
  api_key: "411358491489295",
  api_secret: "QfBgYMk7E1aDZ3Br3RL6IQCSarE",
});

exports.uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result;
  } catch (error) {
    throw new Error('Upload image failed');
  }
};

exports.getAssetInfo = async (publicId) => {
  const options = {
    colors: true,
  };

  try {
    const result = await cloudinary.api.resource(publicId, options);
    console.log(result);
    return result;
  } catch (error) {
    throw new Error('Get image failed');
  }
};
