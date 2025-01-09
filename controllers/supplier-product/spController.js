const { SupplierProduct, Supplier, Product } = require("../../models");

const createSp = async (req, res) => {
  const { productId, supplierId } = req.body;
  try {
    if (!productId || !supplierId) {
      return res.status(400).json({
        status: 400,
        message: "Please provide mandetory fields",
      });
    }

    const newSp = await SupplierProduct.create({
      productId,
      supplierId,
    });

    res.status(201).json({
      status: 201,
      message: "Supplier Product Created Successfully",
      data: newSp,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const getAllSp = async (req, res) => {
  try {
    const sp = await SupplierProduct.findAll({
      attributes: ["id", "productId", "supplierId"],
      include: [
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id", "name", "email", "phone_number", "address"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "description", "sku", "quantity", "price"],
        },
      ],
    });

    if (sp.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No Supplier Product Found",
      });
    }

    const groupedData = sp.reduce((acc, item) => {
      const { supplier, product } = item;
      const existingSupplier = acc.find((s) => s.id === supplier.id);

      if (existingSupplier) {
        existingSupplier.products.push(product);
      } else {
        acc.push({
          id: supplier.id,
          name: supplier.name,
          email: supplier.email,
          phone_number: supplier.phone_number,
          address: supplier.address,
          products: [product],
        });
      }
      return acc;
    }, []);

    res.status(200).json({
      status: 200,
      message: "All Supplier Products are found",
      data: groupedData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getproductaccsupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const sp = await SupplierProduct.findAll({
      where: {
        supplierId,
      },
      attributes: ["id"],
      include: [
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id", "name", "email", "phone_number", "address"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "description", "sku", "quantity", "price"],
        },
      ],
    });

    if (sp.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No Supplier Product Found",
      });
    }

    const groupdData = sp.reduce((acc, item) => {
      const { supplier, product } = item;
      const existingSupplier = acc.find((s) => s.id === supplier.id);

      if (existingSupplier) {
        existingSupplier.products.push(product);
      } else {
        acc.push({
          id: supplier.id,
          name: supplier.name,
          email: supplier.email,
          phone_number: supplier.phone_number,
          address: supplier.address,
          products: [product],
        });
      }
      return acc;
    }, []);

    res.status(200).json({
      status: 200,
      message: "All Supplier Product are found",
      data: groupdData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const updateSp = async (req,res) => {
  const {id} = req.params;
  try {
    const {productId,supplierId} = req.body;
    const sp = await SupplierProduct.findByPk(id);
    if(!sp){
      return res.status(404).json({
        status: 404,
        message: "No Supplier Product Found"
      })
    }
    if(productId) sp.productId = productId;
    if(supplierId) sp.supplierId = supplierId;
    await sp.save();
    res.status(200).json({
      status: 200,
      message: "Supplier Product Updated Successfully",
      data: sp
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
}

const deleteSp = async (req,res) => {
  const {id} = req.params;
  try {
    const sp = await SupplierProduct.findByPk(id);
    if(!sp){
      return res.status(404).json({
        status: 404,
        message: "No Supplier Product Found"
      })
    }
    await sp.destroy();
    res.status(200).json({
      status : 200,
      message : "deleted Successfully"
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
}

module.exports = {
  createSp,
  getAllSp,
  getproductaccsupplier,
  updateSp,
  deleteSp
};
