import Message from '../models/Message.js';
import { validaGetMessage } from '../utils/validate.get.message.js';
import { validateMessage } from '../utils/validate.message.js';

export const sendMessage = async (req, res) => {
    const from = req.idToken;
    const { to, message } = req.body;

    try {
        const { errors, valid } = await validateMessage({ to, message, from });
        if (!valid) {
            throw errors
        };

        const sendMessage = {
            message,
            from,
            to,
            createdAt: new Date().toISOString(),
        }

        const data = await Message.create(sendMessage);

        return res.status(201).json({ message: 'Mensaje enviado', data });
    } catch (err) {
        return res.status(400).json({ message: 'Error', errors: err });
    }
};

export const getAllMessagesByFromAndTo = async (req, res) => {
    const from = req.idToken;
    const { to } = req.query;

    try {
        const { errors, valid } = await validaGetMessage(to);
        if (!valid) {
            throw errors
        };

        const messages = await Message.find({ from: { $in: [from, to] }, to: { $in: [from, to] } }).sort({ createdAt: "desc" });

        return res.status(200).json({ message: 'Mensajes', data: messages });
    } catch (err) {
        return res.status(400).json({ message: 'Error', errors: err })
    }
};