import jwt from 'jsonwebtoken';

const generateTokenAndSetCookies = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000
    });
}

export default generateTokenAndSetCookies;