const express = require("express");

const {
  createImages,
  getAllProductImages,
  deleteImage,
} = require("../../controllers/product-images/productImagesController");
const base64ToImages = require("../../middlewares/base64ToImage");

const router = express.Router();

router.post("/create", base64ToImages, createImages);
router.get("/get-all", getAllProductImages);
router.delete("/delete/:id", deleteImage);

module.exports = router;
