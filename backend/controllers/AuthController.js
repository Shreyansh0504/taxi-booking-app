import UserModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// register
export const RegisterController = async (req, res) => {
    try {
        const { name, email, password, phone, userType } = req.body
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists."
            })
        }
        else {
            const today = new Date();
            const startDt = today.toISOString().split('T')[0];
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new UserModel({ name, email, password: hashedPassword, phone, startDt, userType })
            await newUser.save()
            return res.status(200).send({
                success: true,
                message: "User Registered Successfully."
            })
        }
    } catch (error) {
        console.log(`Error in Register Contoller ${error}`.bgRed)
        return res.status(500).send({
            success: false,
            message: "Something went wrong while registering user."
        })
    }
}

// login
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await UserModel.findOne({ email })

        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials."
            })
        }
        else {
            const isMatch = await bcrypt.compare(password, existingUser.password)
            if (isMatch) {
                const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
                existingUser.password = ""
                return res.status(200).send({
                    user: existingUser,
                    token,
                    success: true,
                    message: "User Logged in Successfully."
                })
            }
            else {
                return res.status(400).send({
                    success: false,
                    message: "Invalid credentials."
                })
            }
        }
    } catch (error) {
        console.log(`Error in Login Contoller ${error}`.bgRed)
        return res.status(500).send({
            success: false,
            message: "Something went wrong while login user."
        })
    }
}

