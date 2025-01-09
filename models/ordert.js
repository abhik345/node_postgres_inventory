module.exports = (sequelize, DataTypes) => {
  const Ordert = sequelize.define(
    "Ordert",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: "Quantity must be an integer",
          },
          min: {
            args: [0],
            msg: "Quantity cannot be negative",
          },
        },
      },
      order_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "in",
        validate: {
          notEmpty: {
            msg: "Order type cannot be empty",
          },
          isIn: {
            args: [["in", "out"]],
            msg: "Order Type must be one of 'in' or 'out'",
          },
        },
      },
      order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
    }
  );

  Ordert.associate = (models) => {
    Ordert.belongsTo(models.Supplier, {
      foreignKey: "supplierId",
      as: "supplier",
    });

    Ordert.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return Ordert;
};
