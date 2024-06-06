import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//funcion para registrar usuarios
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    //console.log(username, email, password);

    try {

        //validamos que el email no este regisytrado en la base de datos
        const userFound = await User.findOne({ email });
        if (userFound) //si encuentra un usuario que ya tenga este email
            return res.status(400) //retorna un mensaje de error
                .json({ message: ["El email ya esta en uso"] })

        const passwordHash = await bcryptjs.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save()
        //console.log(userSaved);
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        console.log(error);
    }
}

// Función para iniciar sesión
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).json({ message: ['Usuario no encontrado'] });
        }
        //comparamos el password que envio el usuario con el de la base de datos
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: ['Pasword no coincide'] });
        }
        const token = await createAccessToken({ id: userFound._id });
        res.status(200).cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        console.log(error);

    }
}

export const logout = (req, res) => {
    res.clearCookie("token");
    return res.sendStatus(200);

}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound)
        return res.status(400).json({ message: ["User not found"] });

    return res.json({
        _id: userFound._id,
        username: userFound.username,
        email: userFound.email,
    })
} //fin profile

//funcion para validar el token de inicio de sesion 
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token)
        return res.status(401).json({ message: ["No Autorizado"] });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err)  //si Hay un error al validar el token
            return res.status(401).json({ message: ["No Auntorizado"] });

        const userFound = await User.findById(user.id);
        if (!userFound)
            return res.status(401).json({ message: ["No Autorizado"] });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })
}
