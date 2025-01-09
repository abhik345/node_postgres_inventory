require("dotenv").config(".env");

const express = require("express");
const bodyParser = require("body-parser")

const userRoutes = require("./routes/user/userRoutes");
const productRoutes = require("./routes/product/productRoutes");
const productImageRoutes = require("./routes/product-images/productImageRoutes");
const supplierRoutes = require("./routes/supplier/supplierRoutes");
const supplierProductRoutes = require("./routes/supplier-product/spRoutes");

const app = express();
const port = 3000;
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/product-image", productImageRoutes);
app.use("/api/supplier",supplierRoutes);
app.use("/api/supplier-product",supplierProductRoutes);

app.get("/", (req, res) => {
  res.send("Hello this is the inventory Managemant app");
});

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT || port}`);
});
