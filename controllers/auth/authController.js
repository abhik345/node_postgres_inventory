const { User }  = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');


const validateFields = (fields, body) => {
    for (const field of fields) {
        if (!body[field]) {
            return {
                status: 400,
                message: `Please provide ${field}`
            };
        }
    }
    return null;
};

const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        const validationError = validateFields(['email','password'],req.body);
        if(validationError){
            return res.status(validationError.status).json(validationError);
        }
        const user = await User.findOne({
            where : {
                email
            }
        })
        if(!user){
            return res.status(404).json({
                status : 404,
                message : "User not found please register"
            })
        }
        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(isPasswordMatched){
            const token = jwt.sign({id: user.id,role : user.role}, "qwerty1234", {
                expiresIn : "10d"}
            );
            const {password,createdAt,updatedAt, ...userData} = user.dataValues;
            return res.status(200).json({
                status : 200,
                message : "User logged in successfully",
                data : {
                    userData,
                    token
                }})
        } else {
            return res.status(401).json({
                status : 401,
                message : "Password is incorrect"
            })
        }
    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}

const loginWithCookie = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validationError = validateFields(['email', 'password'], req.body);
        if (validationError) {
            return res.status(validationError.status).json(validationError);
        }
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found, please register"
            });
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                status: 401,
                message: "Password is incorrect"
            });
        }
        const token = jwt.sign(
            { id: user.id, role: user.role },
            "qwerty1234",
            { expiresIn: "10d" }
        );

        res.cookie("authToken", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            maxAge: 10 * 24 * 60 * 60 * 1000,
            sameSite: "strict" 
        });
        const { password: _, createdAt, updatedAt, ...userData } = user.dataValues;
        return res.status(200).json({
            status: 200,
            message: "User logged in successfully",
            data: {userData, token}
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

const register = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        if (!userName || !email || !role) {
            return res.status(400).json({
                status: 400,
                message: "Please provide all fields"
            });
        }
        if (!password || password.length < 8 || password.length > 100) {
            return res.status(400).json({
                status: 400,
                message: "Password must be between 8 and 100 characters"
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            status: 201,
            message: "User is registered successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};


const resetPassword = async (req,res) => {
    try {
        const { email, password,old_password } = req.body;
        const validationError = validateFields(['email', 'password',"old_password"], req.body);
        if (validationError) {
            return res.status(validationError.status).json(validationError);
        }
        const user = await User.findOne({
            where : {
                email
            }
        })
        if(!user){
            return res.status(404).json({
                status : 404,
                message : "User not found"
            })
        }
        if(old_password){
            const isPasswordMatched = await bcrypt.compare(old_password,user.password);
            if(!isPasswordMatched){
                return res.status(401).json({
                    status : 401,
                    message : "Old password is incorrect please provide correct password or reset password"
                })
            }
        }
        if(password){
            const salt = bcrypt.genSaltSync(10);

            const hashedPassword = bcrypt.hashSync(password,salt);
            user.password = hashedPassword;

            await user.save();

            res.status(200).json({
                status : 200,
                message : "Password updated successfully",
        })
        } else {
            return res.status(400).json({
                status : 400,
                message : "Please provide password"
            })
        }
    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const validationError = validateFields(['email'], req.body);
        if (validationError) {
            return res.status(validationError.status).json(validationError);
        }
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        
        user.passwordResetToken = hashedToken;
        user.tokenExpiry = Date.now() + 15 * 60 * 1000; 
        await user.save();

        // Send email with reset link
        const resetUrl = `https://localhost:5173/reset-password/${resetToken}`;
        // await sendEmail({
        //     to: email,
        //     subject: 'Password Reset Request',
        //     text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
        // });

        res.status(200).json({
            status: 200,
            message: 'Password reset link sent to your email.',
            data : resetUrl
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};


module.exports = {
    login,
    register,
    resetPassword,
    forgetPassword,
    loginWithCookie
}