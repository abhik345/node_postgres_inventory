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

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.status(200).json({
            status: 200,
            message: "Suppliers fetched successfully",
            data: suppliers,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

const getSingleSupplier = async (req,res) => {
    try {
        const {id} = req.params;
        const singleSupplier = await Supplier.findByPk(id,{
            attributes : {
                exclude : ["createdAt","updatedAt"]
            }
        })
        if(!singleSupplier){
            return res.status(404).json({
                status : 404,
                message : "Supplier not found"
            })
        }
        res.status(200).json({
            status : 200,
            message : "Supplier Found",
            data : singleSupplier
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        })
    }
}

const updateSupplierById = async (req,res) => {
    try {
        const {id} = req.params;

        const {name,email,phone_number,address} = req.body;

        const existingSuuplier = await Supplier.findByPk(id);

        if(name) existingSuuplier.name = name;
        if(email) existingSuuplier.email = email;
        if(phone_number) existingSuuplier.phone_number = phone_number;
        if(address) existingSuuplier.address = address;
        await existingSuuplier.save();
        res.status(200).json({
            status : 200,
            message : "Supplier Updated Successfully",
            data : existingSuuplier
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}

const deleteSupplierById = async (req,res) => {
    try {
        const {id} = req.params;
        const existingSupplier = await Supplier.findByPk(id);
        if(!existingSupplier){
            return res.status(404).json({
                status : 404,
                message : "Supplier not found"
            })
        }
        await existingSupplier.destroy();
        res.status(200).json({
            status : 200,
            message : "Supplier Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}



module.exports = {
    createSupplier,
    getAllSuppliers,
    getSingleSupplier,
    updateSupplierById,
    deleteSupplierById
}