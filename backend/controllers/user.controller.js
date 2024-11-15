import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
    try {
        const userId = req.user._id;
        const users = await User.find({ _id: { $ne: userId } }).select('-password');

        return res.status(200).json(users);
    } catch (error) {
        console.log(`Error in get user for side bar controller: ${error.message}`);
        return res.status(500).json('Internal server error');
    }
}