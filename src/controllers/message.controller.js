import Message from '../models/Message.js';
import { validaGetMessage } from '../utils/validate.get.message.js';

export const sendMessage = async (req, res) => {
    const body = req.body;

    try {
        const { errors, valid } = await validateMessage(body);
        if (!valid) {
            throw errors
        };

        const message = {
            message: body.message,
            from: body.from,
            to: body.to,
            createdAt: new Date().toISOString(),
        }

        const data = await Message.create(message);
        return res.status(201).json({ message: 'Mensaje enviado', data });
    } catch (err) {
        return res.status(400).json({ message: 'Error', errors: err });
    }
};

export const getAllMessagesByFromAndTo = async (req, res) => {
    const { from, to } = req.body;

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