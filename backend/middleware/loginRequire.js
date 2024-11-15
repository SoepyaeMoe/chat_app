import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const loginRequire = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) return res.status(401).json({ error: "Unauthorized - No token provided" });

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        if (!userId) {
            return res.status.status(400).json({ error: "Invaild token" });
        }

        const user = await User.findById(userId).select('-password');

        req.user = user;
        next();

    } catch (error) {
        console.log(`Error in login require middleware: ${error.message}`);
        return res.status(500).json('Internal Server Error');
    }
}

export default loginRequire;