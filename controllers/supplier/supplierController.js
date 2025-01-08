const {Supplier} = require("../../models");


const createSupplier = async (req,res) => {
    try {
        const {name,email,phone_number,address} = req.body;
        if(!name || !email || !phone_number || !address){
            return res.status(400).json({
                status : 400,
                message : "please provide mandetory fields"
            })
        }
        const newSupplier = await Supplier.create({
            name,
            email,
            phone_number,
            address
        })
        res.status(201).json({
            status : 201,
            message : "Supplier creatd Successfully",
            data : newSupplier
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message : error.message
        })
    }
}

module.exports = {
    createSupplier
}