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
                },
                include: ['User', 'Category'],
            })

            res.status(200).json(products)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async addProduct(req, res, next) {
        try {
            const { categoryId, categoryName, sku, name, description, weight, width, length, height, price } = req.body;
           
            const generateSKU = () => {
                const length = 6;
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
              
                for (let i = 0; i < length; i++) {
                  const randomIndex = Math.floor(Math.random() * characters.length);
                  result += characters.charAt(randomIndex);
                }
              
                return result;
            };
            
            const generatedSKU = sku || generateSKU();

            const saveNewProduct = await Product.create({
                categoryId,
                categoryName,
                sku: generatedSKU,
                name,
                description,
                weight,
                width,
                length,
                height,
                image: req.imageUrl,
                price,
                authorId: req.user.id
            });

            if (saveNewProduct) {
                return res.status(200).json({
                    "message": "New User created successfully",
                    data: saveNewProduct
                });
            }
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    static async editProduct(req, res, next) {
        try {
            const { id } = req.params
            // console.log(id);

            const product = await Product.findByPk(id)
            if (!product) {
                throw { name: 'NotFound' }
            }
            const { categoryId, categoryName, sku, name, description, weight, width, length, height, price } = req.body

            await Product.update({
                categoryId,
                categoryName,
                sku,
                name,
                description,
                weight,
                width,
                length,
                height,
                image: req.imageUrl,
                price
            }, { where: { id } })

            res.status(200).json({ message: "success updated" })

        } catch (error) {
            next(error)
        }
    }

    static async deleteProductById(req, res, next) {
        try {
            const { id } = req.params
        
            const product = await Product.findByPk(id)
        
            await Product.destroy({ where: { id } })

            res.json({ message: `Product ${product.name} success to delete` })

        } catch (error) {
            next(error)
        }
    }

    static async readProductById(req, res, next) {
        try {
            const { id } = req.params
            
            const product = await Product.findByPk(id, { include: ['Category'] })
            if (!product) {
                const error = new Error();
                error.name = 'NotFound';
                error.productId = id;
                throw error;
            }

            res.status(200).json(product)

        } catch (error) {
            next(error)
        }
    }


}

module.exports = ProductController