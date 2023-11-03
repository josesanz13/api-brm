import jwt from "jsonwebtoken";
import models from "../models/index"
import config from "../config";

const UserModel = models.User;

export const register = async (req, res, next) => {
    const { name, user_name, email, rol, password } = req.body;

    // Validate that the string does not contain whitespace.
    if (hasWhiteSpace(user_name) || user_name == '') {
        res.status(400).json({
            msg: "El campo user_name [No debe contener espacios] [Es obligatorio]"
        })
        return;
    }

    try {
        const user = new UserModel({
            name,
            user_name,
            email,
            rol: rol.toLowerCase(),
            password: await UserModel.encryptPassword(password)
        })
        await user.save();

        // Create token
        const token = jwt.sign({ id: user.id }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        })

        res.status(200).json({ token })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error, el usuario no ha sido creado correctamente. Comuniquese con el administrador"
        });
        next();
    }
}

export const login = async (req, res, next) => {
    const { user_name, password } = req.body;

    try {
        // Get user
        const userFound = await UserModel.findOne({
            where: {
                user_name: user_name
            }
        });

        if (!userFound) {
            return res.status(400).json({
                msg: "Usuario no existe"
            })
        }

        // Match passwords
        const matchPassword = await UserModel.comparePassword(password, userFound.password);

        if (!matchPassword) {
            return res.status(401).json({
                token: null,
                msg: "Usuario y/o Contraseña incorrectos."
            })
        }

        // Create token
        const token = jwt.sign({ id: userFound.id }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        })

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error, el usuario no ha sido creado correctamente. Comuniquese con el administrador"
        });
        next();
    }
}

const hasWhiteSpace = (string) => {
    return /\s/g.test(string);
}