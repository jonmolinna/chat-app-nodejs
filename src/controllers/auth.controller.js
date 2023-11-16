import User from "../models/User.js";
import { generateToken } from "../utils/create.token.js";
import { validateAuth } from "../utils/validate.auth.js";

export const auth = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { errors, valid } = await validateAuth(email, password);

        if (!valid) {
            throw errors
        };

        const user = await User.findOne({ email });
        const token = generateToken(user);

        return res.json({
            message: 'Auntenticacion Correcta',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });

    } catch (err) {
        return res.status(400).json({ message: 'Error', errors: err })
    }
};