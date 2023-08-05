const imagekit = require("imagekit");

const imageKit = new imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const imageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    await new Promise((resolve, reject) => {
      imageKit.upload(
        {
          file: req.file.buffer.toString("base64"),
          fileName: req.file.originalname,
          folder: "productKlontong",
          useUniqueFileName: false,
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            req.imageUrl = response.url;
            resolve();
          }
        }
      );
    });

    next();

  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = imageUpload;
