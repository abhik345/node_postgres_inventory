const {Ordert} = require("../../models");

const createOrder = async (req, res) => {
  const { supplierId, productId, quantity, order_type, order_date } = req.body;
  if (!supplierId || !productId || !quantity || !order_date || !order_type) {
    return res.status(400).json({
      status: 400,
      message: "Please provide the mandetory fields",
    });
  }
  try {
    const newOrder = await Ordert.create({ supplierId, productId, quantity, order_type, order_date }, { fields: ["supplierId", "productId", "quantity", "order_type", "order_date"] });
    res.status(201).json({
      status: 201,
      message: "Order is created",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


module.exports = {
    createOrder
}