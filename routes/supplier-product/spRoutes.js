const express = require("express");
const {createSp,getAllSp,getproductaccsupplier,updateSp,deleteSp} = require("../../controllers/supplier-product/spController")


const router = express.Router();

router.post("/create",createSp);
router.get("/get-all",getAllSp);
router.get("/get-sup/:supplierId",getproductaccsupplier);
router.put("/update/:id",updateSp);
router.delete("/delete/:id",deleteSp);


module.exports = router