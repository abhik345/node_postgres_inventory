module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "User name cannot be empty",
            },
            len: {
              args: [3, 50],
              msg: "User name must be between 3 and 50 characters",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          isUnique: true,
          validate: {
            isEmail: {
              msg: "Must be a valid email address",
            },
            notEmpty: {
              msg: "Email cannot be empty",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Password cannot be empty",
            },
            len: {
              args: [8, 100],
              msg: "Password must be at least 8 characters long",
            },
          },
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "user",
          validate: {
            notEmpty: {
              msg: "Role cannot be empty",
            },
            isIn: {
              args: [["admin", "user", "moderator"]],
              msg: "Role must be one of 'admin', 'user', or 'moderator'",
            },
          },
        },
      },
      {
        timestamps: true,
      }
    );
    return User;
  };
  