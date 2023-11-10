import { findOneUserByEmail } from "../service/user.service.js";

export async function validateUser(body) {
    const { name, email, password, confirmPassword } = body;
    const errors = {};
    const nameRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const emailRegex = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
    const user = await findOneUserByEmail(email);

    if (!name.trim()) {
        errors.name = 'Ingrese un nombre';
    }
    if (name.length <= 3) {
        errors.name = 'El nombre debe tener mas de tres caracteres';
    }
    if (name.length >= 25) {
        errors.name = 'El nombre debe tener menos de 25 caracteres';
    }
    if (!nameRegex.test(name)) {
        errors.name = 'El nombre solo acepta letras y espacios';
    }

    if (!email.trim()) {
        errors.email = 'Ingrese un correo';
    }
    if (!emailRegex.test(email)) {
        errors.email = 'Ingrese un correo valido';
    }
    if (user) {
        errors.email = 'Ya existe el correo';
    }

    if (!password) {
        errors.password = 'Ingrese una constraseña';
    }
    if (password !== confirmPassword) {
        errors.password = 'Las constraseñas no son iguales';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
};