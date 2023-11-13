import Message from '../models/Message.js';
import { validateMessage } from '../utils/validate.message.js';

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

export const getAllMessagesByFromAndTo = (req, res) => {

};