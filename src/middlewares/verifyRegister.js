import { Op } from "sequelize";
import models from "../models/index"

const UserModel = models.User;

export const checkRolExist = (req, res, next) => {
    if (req.body.rol) {
        const { rol } = req.body

        if (rol.toLowerCase() == 'admin' || rol.toLowerCase() == 'client') {
            next()
            return;
        }

        return res.status(400).json({
            msg: `El rol ${rol} no existe.`
        })
    }
}

export const checkDuplicateRegister = async (req, res, next) => {
    const { user_name, email } = req.body

    try {
        const userFound = await UserModel.findOne({
            where: {
                [Op.or]: {
                    user_name: user_name,
                    email: email,
                },
            },
        });

        if (userFound) {
            return res.status(400).json({ msg: "El usuario ya existe." })
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error, Comuniquese con el administrador"
        });
    }
}