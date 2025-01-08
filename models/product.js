module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Product name cannot be empty",
          },
          len: {
            args: [3, 50],
            msg: "Product name must be between 3 and 50 characters",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Description can't be empty",
          },
        },
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "SKU cannot be empty",
          },
          len: {
            args: [3, 50],
            msg: "SKU must be between 3 and 50 characters",
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
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price cannot be empty",
          },
          isDecimal: {
            msg: "Price must be a valid decimal number",
          },
          min: {
            args: [0],
            msg: "Price cannot be negative",
          },
        },
      },
    }, {
      timestamps: true,
    });

    Product.associate = ((models)=>{
        Product.hasMany(models.ProductImage, {foreignKey: "productId", as : "images"})
    })
  
    return Product;
  };
  