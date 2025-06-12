
// const cloudinary = require('cloudinary').v2;
// const multer = require("multer");

// cloudinary.config({
//     cloud_name: "da2pfgp37",
//     api_key: "811211592167238",
//     api_secret: "xMx6E3eIGNmAThpvC1nrysw_Ocw"
// });

// const storage = new multer.memoryStorage();

// async function handleImageUpload(file) {
//   const base64String = file.buffer.toString("base64");
//   const dataUri = `data:${file.mimetype};base64,${base64String}`;

//   const result = await cloudinary.uploader.upload(dataUri, {
//     resource_type: "auto",
//   });
//     return result;
// }

// const upload = multer({storage});

// module.exports = {upload, handleImageUpload, cloudinary}


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure your Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,          // ✅ No spaces
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage via multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "superstyles/products", // Optional: target folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

// Configure multer to use Cloudinary storage
const upload = multer({ storage });

// Optional: extract the URL from the uploaded file in your controller
const handleImageUpload = async (req, res) => {
  try {
    const result = req.file; // multer-storage-cloudinary automatically uploads the file
    res.json({
      success: true,
      result: {
        url: result.path,
        public_id: result.filename,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = { cloudinary, upload, handleImageUpload };
