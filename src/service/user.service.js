import User from "../models/User.js";

export const findOneUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const findOneUserById = async (id) => {
    return await User.findOne({ _id: id });
}