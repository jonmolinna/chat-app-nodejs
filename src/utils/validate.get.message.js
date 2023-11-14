import { findOneUserById } from "../service/user.service.js";

export async function validaGetMessage(to) {
    const errors = {};

    if (!to) {
        errors.user = 'No existe el usuario';
    }
    else {
        const user = await findOneUserById(to);

        if (!user) {
            errors.user = 'No existe el usuario';
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
};