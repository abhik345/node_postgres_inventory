module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "ProductImage",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "image_url has be provided",
          },
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

  ProductImage.associate = ((models) => {
    ProductImage.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  });

  return ProductImage;
};
