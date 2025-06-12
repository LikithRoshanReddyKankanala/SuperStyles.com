const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const imagePath = req.file?.path || req.file?.location; // For local or cloud (like S3)

     if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded!",
      });
    }
    console.log(image, "image");

    const featureImages = new Feature({
      image: imagePath,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages };