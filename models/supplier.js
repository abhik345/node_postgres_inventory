module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
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
            msg: "supplier name cannot be empty",
          },
          len: {
            arg: [3, 50],
            msg: "Supplier name must be between 3 to 50 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Must be a valid email",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
        },
      },
      phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone number cannot be empty",
          },
        },
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "address can not be empty",
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );

  Supplier.associate = (models) => {
    Supplier.belongsToMany(models.Product, {
      through: models.SupplierProduct,
      foreignKey: "supplierId",
      as: "products",
    });
    Supplier.hasMany(models.Ordert, { foreignKey: "supplierId", as: "orderts" });
  };

  return Supplier;
};
