const { ProductImage } = require("../../models");

const createImages = async (req, res) => {
  try {
    const { image_urls, productId } = req.body;
    if (!productId || !Array.isArray(image_urls) || image_urls.length === 0) {
      return res.status({
        status: 400,
        message: "Please provide mandetory fields",
      });
    }
    const images = await Promise.all(
      image_urls.map((image_url) =>
        ProductImage.create({ image_url, productId })
      )
    );
    res.status(201).json({
      status: 201,
      message: "Product Images Created Successfully",
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
const getAllProductImages = async (req, res) => {
  try {
    const productsImages = await ProductImage.findAll();
    if (productsImages.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "Images not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Product Image are found",
      data: productsImages,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const existingImage = await ProductImage.findByPk(id);
    if (!existingImage) {
      return res.status(404).json({
        status: 400,
        message: "No Image found",
      });
    }
    await existingImage.destroy();
    res.status(200).json({
      status: 200,
      message: "Image Deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  createImages,
  getAllProductImages,
  deleteImage,
};
