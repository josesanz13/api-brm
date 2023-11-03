import jwt from "jsonwebtoken";
import config from "../config";
import models from "../models/index"

const UserModel = models.User;

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).json({ msg: "No existe token" })
    }

    try {
        const decode = jwt.verify(token, config.SECRET);
        req.userID = decode.id;

        const userFound = await UserModel.findOne({
            where: {
                id: req.userID
            }
        });

        if (!userFound) {
            return res.status(404).json({ msg: "Usuario no existe" })
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error, Comuniquese con el administrador"
        });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            where: {
                id: req.userID
            }
        });

        if (user.rol === 'admin') {
            next();
            return;
        }

        return res.status(403).json({
            msg: "Usuario sin permisos para realizar la acción"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error, Comuniquese con el administrador"
        });
    }
}

export const isClient = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            where: {
                id: req.userID
            }
        });

        if (user.rol === 'client') {
            next();
            return;
        }

        return res.status(403).json({
            msg: "Usuario sin permisos para realizar la acción"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error, Comuniquese con el administrador"
        });
    }

}