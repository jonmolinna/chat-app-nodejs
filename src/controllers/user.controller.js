import User from "../models/User.js";
import Message from '../models/Message.js';
import { validateUser } from "../utils/validate.user.js";
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
    const body = req.body;

    try {
        const { errors, valid } = await validateUser(body);
        if (!valid) {
            throw errors
        };

        let hashPassword = await bcrypt.hash(body.password, 6);

        const newUser = {
            name: body.name,
            email: body.email,
            password: hashPassword,
            createdAt: new Date().toISOString(),
        }

        const data = await User.create(newUser);
        const user = { name: data.name, email: data.email, id: data._id };

        return res.status(201).json({ message: 'Usuario creado', user });
    } catch (err) {
        return res.status(400).json({ message: 'Error', errors: err })
    }
};

export const getAllUsers = async (req, res) => {
    const { from } = req.body;

    try {
        const users = await User.find({ _id: { $ne: from } }).select("-password");
        const messages = await Message.find({ $or: [{ from: from }, { to: from }] }).sort({ createdAt: 'desc' });

        let usersMessage = [];

        const data = users.map(user => {
            let message = messages.find(message => message.from.toString() === user._id.toString() || message.to.toString() === user._id.toString());

            let newUser = {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                messages: message,
            }
            usersMessage.push(newUser);
        });

        usersMessage.sort((a, b) => {
            let createdAt1 = a?.messages?.createdAt || a.createdAt;
            let createdAt2 = b?.messages?.createdAt || b.createdAt;
            let date1 = new Date(createdAt1).getTime();
            let date2 = new Date(createdAt2).getTime();

            if (date1 > date2) {
                return -1;
            }

            if (date1 < date2) {
                return 1;
            }

            return 0;
        });

        return res.status(200).json({ message: 'Users List', users: usersMessage })
    } catch (err) {
        return res.status(400).json({ message: 'Error', errors: err })
    }
};