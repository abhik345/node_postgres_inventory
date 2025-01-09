const express = require("express");
const {createSupplier,getAllSuppliers,getSingleSupplier,updateSupplierById,deleteSupplierById} = require("../../controllers/supplier/supplierController")


const router = express.Router();


router.post("/create",createSupplier);
router.get("/get-all",getAllSuppliers);
router.get("/get-all/:id",getSingleSupplier);
router.put("/update/:id",updateSupplierById);
router.delete("/delete/:id",deleteSupplierById);



module.exports = router