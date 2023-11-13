import User from "../models/User.js";
import { validateUser } from "../utils/validate.user.js";
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
    const body = req.body;

    try {
        const { errors, valid } = await validateUser(body);
        if (!valid) {
            throw errors
        };

        const { name, email, password } = body;
        let hashPassword = await bcrypt.hash(password, 6);

        const data = await User.create({ name, email, password: hashPassword });
        const user = { name: data.name, email: data.email, id: data._id };

        return res.status(201).json({ message: 'Usuario creado', user });
    } catch (err) {
        return res.status(400).json({ message: 'Error', errors: err })
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const data = await User.find().select("-password")

        return res.status(200).json({ message: 'Ok', users: data })
    } catch (err) {
        return res.status(400).json({ message: 'Error', errors: err })
    }
};