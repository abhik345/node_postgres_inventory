module.exports = (sequelize, DataTypes) => {
  const SupplierProduct = sequelize.define(
    "SupplierProduct",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Suppliers",
          key: "id",
        },
        validate: {
          isInt: true,
          customValidator(value) {
            if (typeof value !== "number") {
              throw new Error("supplierId must be a number,not a string");
            }
          },
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        validate: {
          isInt: true,
          customValidator(value) {
            if (typeof value !== "number") {
              throw new Error("productId must be a number,not a string");
            }
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );

  SupplierProduct.associate = (models) => {
    SupplierProduct.belongsTo(models.Supplier, {
        foreignKey: "supplierId",
        as: "supplier",
    });

    SupplierProduct.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
    });
};


  return SupplierProduct;
};
