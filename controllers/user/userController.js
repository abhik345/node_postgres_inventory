const { User } = require("../../models");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    let hashedPassword;
    if (password) {
      const salt =  bcrypt.genSaltSync(10);
      hashedPassword = bcrypt.hashSync(password, salt);
    }
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
        status : 201,
        message: "User created successfully",
        data : newUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      status : 200,
      message: "Users fetched successfully",
      data : users
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    return res.status(200).json({
      status : 200,
      message: "User fetched successfully",
      data : user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Error fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, password, role } = req.body;
    let hashedPassword;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    user.userName = userName || user.userName;
    user.email = email || user.email;
    if(password){
        const salt = bcrypt.genSaltSync(10);
        hashedPassword = bcrypt.hashSync(password,salt);
        user.password = hashedPassword || user.password;
    }
    user.role = role || user.role;
    await user.save();
    return res.status(200).json({
      status : 200,
      message: "User updated successfully",
      data : user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    await user.destroy();
    return res.status(200).json({ status: 200, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Error deleting user" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
