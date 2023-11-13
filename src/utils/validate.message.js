import { findOneUserById } from "../service/user.service.js";

export async function validateMessage(body) {
    const { message, from, to } = body;
    const errors = {};

    if (!message.trim()) {
        errors.message = 'Ingrese un mensage';
    }

    if (!to) {
        errors.to = 'No existe el usuario';
    }
    else {
        const user = await findOneUserById(to);

        if (!user) {
            errors.to = 'No existe el usuario';
        }
    }

    if (!from) {
        errors.from = 'No tienes permiso';
    }
    else {
        const user = await findOneUserById(to);

        if (from === user?._id.toString()) {
            errors.from = 'No puedes enviarte mensajes a ti mismo'
        }
    }


    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}