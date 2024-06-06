import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../mongoose/schemas/user.js";

const salt = bcrypt.genSaltSync(10);

export const register = async (req, res) => {

    const { username, email, password, avatar } = req.body;

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        avatar,
    })
    try {
        const saveUser = await newUser.save();
        return res.status(201).json({ message: "New User created successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create user!" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) return res.status(401).json({ message: "Invalid Credentials!" })

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Password" });

        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            id: user.id,
        }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: age })

        const {password: userPassword, ...userInfo}= user._doc
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age
        })
            .status(200)
            .json(userInfo);

    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Login Failed!!!" })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logout Successful"})
}