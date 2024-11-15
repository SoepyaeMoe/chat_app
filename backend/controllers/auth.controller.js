import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from '../utils/generateToken.js';

export const singup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "username, password, confirm password and gender fields are required." });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "User already exists." });
        }

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Password does not match." });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password ? password : '', salt);

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === 'female' ? girlPic : boyPic,
        });

        newUser.save();

        generateTokenAndSetCookies(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullName,
            username,
            gender,
            profilePic: newUser.profilePic
        });

    } catch (error) {
        console.log(`Error in signup: ${error.message}`);
        res.status(500).json("Internal Server Error");
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password fields are require." });
        }

        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ error: "User not found. If you have not account, please sign up." });

        if (bcrypt.compareSync(password, user.password)) {
            generateTokenAndSetCookies(user._id, res);
            return res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                gender: user.gender,
                profilePic: user.profilePic
            });
        } else {
            return res.status(400).json({ error: 'Incorrect password.' });
        }
    } catch (error) {
        console.log(`Error in login: ${error.message}`);
        return res.status(500).json("Internal Server Error");
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: "Logout success." });
    } catch (error) {
        console.log(`Error in logout: ${error.message}`);
        return res.status(500).json('Internal Server Error');
    }
}