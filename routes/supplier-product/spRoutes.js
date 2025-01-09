const express = require("express");
const {createSp,getAllSp,getproductaccsupplier} = require("../../controllers/supplier-product/spController")


const router = express.Router();

router.post("/create",createSp);
router.get("/get-all",getAllSp);
router.get("/get-sup/:supplierId",getproductaccsupplier);


module.exports = router