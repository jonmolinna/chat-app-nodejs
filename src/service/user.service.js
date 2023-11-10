import User from "../models/User.js";

export const findOneUserByEmail = async (email) => {
    return await User.findOne({ email });
};