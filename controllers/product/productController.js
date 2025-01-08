const {Product, ProductImage} = require("../../models");



const createProduct = async (req,res) => {
    try {
        const {name,description,sku,quantity,price} = req.body;


        if(!name || !description || !sku || !quantity || !price){
            return res.status(400).json({
                status: 400,
                message: "Please fill the mandetory fields"
            })
        }

        const newProduct = await Product.create({
            name,
            description,
            sku,
            quantity,
            price
        })

        return res.status(201).json({
            status : 201,
            message : "Product Created Successfully",
            data : newProduct
        })


    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}

const getAllProducts = async (req,res) => {
    try {
        const products = await Product.findAll({
            attributes : ["id","name","description","sku","quantity","price"]
        })
        if(products.length === 0){
            return res.status(404).json({
                status: 404,
                message : "No Products Found"
            })
        }
        res.status(200).json({
            status : 200,
            message : "All Prodcuts are found",
            data : products
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message : error.message
        })
    }
}

const getProductById = async (req,res) => {
    try {
        const {id} = req.params;
        const singleProduct = await Product.findByPk(id,{
            attributes : ["id","name","description","sku","quantity","price"],
            include : [
                {
                    model : ProductImage,
                    as : "images",
                    attributes : ["id","image_url"]
                }
            ]
        })
        if(!singleProduct){
            return res.status(404).json({
                status : 404,
                message : "Product not found"
            })
        }
        res.status(200).json({
            status : 200,
            message : "Product Found",
            data : singleProduct
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}

const updateProductById = async (req,res) => {
    try {
        const {id} = req.params;

        const {name,description,sku,quantity,price} = req.body;

        const existingProduct = await Product.findByPk(id);

        if(!existingProduct){
            return res.status(404).json({
                status : 404,
                message : "No Product Found"
            })
        }

        if(name) existingProduct.name = name;
        if(description) existingProduct.description = description;
        if(sku) existingProduct.sku = sku;
        if(quantity) existingProduct.quantity = quantity;
        if(price) existingProduct.price = price;

        await existingProduct.save();

        return res.status(200).json({
            status : 200,
            message : "Product Updated Successfully",
            data : existingProduct
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}

const deleteProductById = async (req,res) => {
    try {
        const {id} = req.params;
        const existingProduct = await Product.findByPk(id);
        if(!existingProduct){
            return res.status(404).json({
                status: 404,
                message : "Product Not Found"
            })
        }
        await existingProduct.destroy();
        res.status(200).json({
            status: 200,
            message : "Product Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message : error.message
        })
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}
