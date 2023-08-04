const { Product } = require("../models")

class ProductController {
    static async readProduct(req, res, next) {
        try {
            const products = await Product.findAll({

                order: [
                    ['id', 'ASC']
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            res.status(200).json(products)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

   
}

module.exports = ProductController