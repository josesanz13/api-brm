import models from "../models/index"
import { currentDate } from "../libs";

const ProductModel = models.Product;
const UserModel = models.User
const PurchaseModel = models.Purchase
const PurchaseProductModel = models.PurchaseProduct

export const purchase = async (req, res, next) => {
    const data = req.body;

    try {
        let sum_amount = 0.00;

        // Store product
        const purchase = new PurchaseModel({
            userId: req.userID,
            amount: sum_amount,
            dateCreate: currentDate()
        })
        await purchase.save();

        if (!purchase) {
            throw new Error("La compra no ha sido guardada correctamente")
        }

        for (let i = 0; i < data.length; i++) {
            const productId = data[i].idProduct;
            const quantity = data[i].quantity;
            const productFound = await ProductModel.findByPk(productId);

            // Validate product
            if (!productFound) {
                throw new Error(`El producto con el ID : ${productId} no existe`)
            }

            if (quantity <= 0) {
                throw new Error(`Ingrese una cantidad valida para el producto con ID : ${productId}`)
            }

            if (productFound.quantity == 0) {
                throw new Error(`producto ID : ${productId} sin existencias disponibles.`)
            }

            if (quantity > productFound.quantity) {
                throw new Error(`Cantidad no disponible para producto con el ID : ${productId}`)
            }

            // Sum of products price
            const amount = parseFloat(productFound.price * quantity);
            sum_amount += amount;

            // Push product purchase
            const purchaseProductInsert = new PurchaseProductModel({
                purchaseId: purchase.id,
                productId: productId,
                quantity: quantity,
                amount: amount
            })

            await purchaseProductInsert.save();

            // Update quantity product
            await productFound.update({
                quantity: parseFloat(productFound.quantity - quantity)
            })
        }

        // Update amount
        await purchase.update({
            amount: sum_amount
        });


        // Invoice after success purchase
        const lastPurchase = await PurchaseModel.findAll({
            where: {
                id: purchase.id
            },
            include: [
                {
                    model: PurchaseProductModel,
                    as: 'purchases',
                    attributes: {
                        exclude: ['id', 'purchaseId', 'productId', 'createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    },
                    include: {
                        model: ProductModel,
                        as: 'productPurchase',
                        attributes: ['name', 'price', 'lot'],
                        through: {
                            attributes: []
                        }
                    }
                }
            ],
            attributes: {
                exclude: ['id', 'userId', 'updatedAt', 'createdAt']
            },
        })

        res.json(lastPurchase)
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: error.message
        })
    }
}

export const generalInvoiceForClient = async (req, res, next) => {
    const purchase = await PurchaseModel.findAll({
        where: {
            userId: req.userID
        },
        include: [
            {
                model: PurchaseProductModel,
                as: 'purchases',
                attributes: {
                    exclude: ['id', 'purchaseId', 'productId', 'createdAt', 'updatedAt']
                },
                through: {
                    attributes: []
                },
                include: {
                    model: ProductModel,
                    as: 'productPurchase',
                    attributes: ['name', 'price'],
                    through: {
                        attributes: []
                    }
                }
            }
        ],
        attributes: {
            exclude: ['id', 'userId', 'amount', 'createdAt', 'updatedAt', 'dateCreate']
        }
    })

    res.status(200).json(purchase)
}

export const generateGeneralInvoiceForAdmin = async (req, res, next) => {
    try {
        const purchase = await PurchaseModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: 'user',
                    attributes: ['name']
                },
                {
                    model: PurchaseProductModel,
                    as: 'purchases',
                    attributes: ['productId', 'quantity', 'amount'],
                    through: {
                        attributes: []
                    },
                    include: {
                        model: ProductModel,
                        as: 'productPurchase',
                        attributes: ['name', 'lot', 'price'],
                        through: {
                            attributes: []
                        }
                    }
                }
            ],
            attributes: ['id', 'amount', 'createdAt']
        })

        res.status(200).json(purchase)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error, comuniquese con el administrador"
        });
        next();
    }
}