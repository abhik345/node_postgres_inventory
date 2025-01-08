const fs = require('fs');
const path = require('path');

const base64ToImages = (req, res, next) => {
    const { image_urls } = req.body;

    if (!Array.isArray(image_urls) || image_urls.length === 0) {
        return res.status(400).json({ error: 'Please provide an array of base64 image URLs' });
    }

    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    try {
        req.body.image_urls = image_urls.map((base64Image, index) => {
            const matches = base64Image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                throw new Error('Invalid base64 image format');
            }
            const imageType = matches[1];
            const imageData = matches[2];
            const imageBuffer = Buffer.from(imageData, 'base64');
            const imageName = `image-${Date.now()}-${index}.${imageType}`;
            const imagePath = path.join(uploadsDir, imageName);
            fs.writeFileSync(imagePath, imageBuffer);
            return `/uploads/${imageName}`; 
        });

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Error processing images' });
    }
};

module.exports = base64ToImages;
