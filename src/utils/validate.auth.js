import { findOneUserByEmail } from "../service/user.service.js";
import bcrypt from 'bcryptjs';

export async function validateAuth(email, password) {
    const errors = {};

    if (!email.trim()) {
        errors.email = 'Ingrese un email';
    }

    if (!password) {
        errors.password = 'Ingrese una contraseña';
    }

    if (email && password) {
        const user = await findOneUserByEmail(email);

        if (!user) {
            errors.message = 'Credenciales Incorrectas';
        }
        else if (!await bcrypt.compare(password, user?.password)) {
            errors.message = 'Credenciales Incorrectas';
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
};