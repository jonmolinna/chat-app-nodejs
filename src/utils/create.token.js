import jwt from "jsonwebtoken";
import { SECRET_KEY_TOKEN } from "../config.js";

export function generateToken(data) {
    return jwt.sign(
        {
            id: data._id,
        },
        SECRET_KEY_TOKEN,
        { expiresIn: '1d' },
    )
};