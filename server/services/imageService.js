const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;

const imageService = {
  async processAndUpload(file, options = {}) {
    try {
      // Process image with sharp
      const processed = await sharp(file.buffer)
        .resize({
          width: options.width || 1200,
          height: options.height,
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80 })
        .toBuffer();

      // Upload to cloudinary
      const result = await cloudinary.uploader.upload_stream({
        folder: options.folder || 'portfolio',
        resource_type: 'image'
      }).end(processed);

      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height
      };
    } catch (error) {
      console.error('Image processing failed:', error);
      throw error;
    }
  },

  generateBlurHash(file) {
    // Generate blur hash for image loading
  }
}; 