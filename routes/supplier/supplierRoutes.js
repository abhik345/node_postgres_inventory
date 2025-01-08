const express = require("express");
const {createSupplier} = require("../../controllers/supplier/supplierController")


const router = express.Router();


router.post("/create",createSupplier);



module.exports = router