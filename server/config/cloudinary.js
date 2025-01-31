const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image with optimization
const uploadImage = async (file, folder = 'portfolio') => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
      transformation: [
        { width: 1200, crop: 'limit' }, // max width for full size
        { quality: 'auto:good' }, // automatic quality optimization
        { fetch_format: 'auto' } // automatic format selection
      ]
    });

    // Generate additional sizes
    const thumbnail = cloudinary.url(result.public_id, {
      width: 300,
      crop: 'fill',
      quality: 'auto:good',
      fetch_format: 'auto'
    });

    const medium = cloudinary.url(result.public_id, {
      width: 600,
      crop: 'fill',
      quality: 'auto:good',
      fetch_format: 'auto'
    });

    return {
      original: result.secure_url,
      thumbnail,
      medium,
      public_id: result.public_id
    };
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('Image upload failed');
  }
};

// Delete image
const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Image deletion failed:', error);
    throw new Error('Image deletion failed');
  }
};

module.exports = {
  uploadImage,
  deleteImage
}; 