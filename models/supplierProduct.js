module.exports = (sequelize, DataTypes) => {
    const SupplierProduct = sequelize.define(
      "SupplierProduct",
      {
        id: {
            type :DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        supplierId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Suppliers",
            key: "id",
          },
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Products", 
            key: "id",
          },
        },
      },
      {
        timestamps: true,
      }
    );
  
    return SupplierProduct;
  };