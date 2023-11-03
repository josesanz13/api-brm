import models from "../models/index"
import { currentDate } from "../libs";

const ProductModel = models.Product;

export const createProduct = async (req, res, next) => {
    const { body } = req;

    try {
        const product = new ProductModel({
            ...body,
            dateCreate: currentDate()
        });

        await product.save();

        res.status(200).json(product)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error, el producto no ha sido guardado correctamente. Comuniquese con el administrador"
        });
        next();
    }
}

export const getProducts = async (req, res) => {
    const products = await ProductModel.findAll();

    res.status(200).json(products)
}

export const getProductByID = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await ProductModel.findByPk(productId);

        if (!product) {
            res.status(404).json({
                msg: `No existe producto con el ID : ${productId}`
            })
            return;
        }

        res.status(200).json(product)

    } catch (error) {
        res.status(500).send({
            error
        });
        next();
    }
}

export const updateProductById = async (req, res) => {
    const { body } = req;
    const { productId } = req.params;

    try {

        const product = await ProductModel.findByPk(productId);

        if (!product) {
            res.status(404).json({
                msg: `No existe producto con el ID : ${productId}`
            })
            return;
        }

        await product.update(body);

        res.status(200).json(product)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error, el producto no ha sido actualizado correctamente"
        });
        next();
    }
}

export const deleteProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await ProductModel.findByPk(productId);

        if (!product) {
            res.status(404).json({
                msg: `No existe producto con el ID : ${productId}`
            })
            return;
        }

        await product.destroy();

        res.status(204).json({
            msg: `Se ha eliminado coreectamente el producto con ID : ${productId}`
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error, el producto no ha sido eliminado correctamente"
        });
        next();
    }
}