const express = require("express");

const {createProduct,getAllProducts,getProductById, updateProductById, deleteProductById} = require("../../controllers/product/productController.js")

const router = express.Router();

router.post("/create",createProduct);
router.get("/get-all",getAllProducts);
router.get("/get-all/:id",getProductById);
router.put("/update/:id",updateProductById);
router.delete("/delete/:id",deleteProductById);


module.exports = router