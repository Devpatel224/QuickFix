const cloudinary = require("cloudinary").v2
const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name: 'dhgqymdqa', 
        api_key: '111122564643743',
    api_secret:'4MqgkucB_eWgl7MwPQOciR0O9Bg'
});



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {   
      folder: "uploads", // Cloudinary folder name
      format: async () => "png", // Image format
      public_id: (req, file) => file.fieldname + "-" + Date.now(),
    },
  }); 

const upload = multer({storage})

module.exports = {upload}

