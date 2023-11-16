import jwt from 'jsonwebtoken';
import { SECRET_KEY_TOKEN } from '../config.js';

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    try {
        if (!token) {
            throw { message: 'No tienes Autorización' }
        }

        const bearer = token.split(" ");
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, SECRET_KEY_TOKEN, function (err, decoded) {
            if (err) {
                throw { message: 'No tienes Autorización' };
            } else {
                const { id } = decoded;
                req.idToken = id;
            }
        });

    } catch (err) {
        return res.status(401).json({
            auth: false,
            errors: err,
        })
    };

    next();
};

export default verifyToken;