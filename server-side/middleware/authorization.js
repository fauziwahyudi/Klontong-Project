const { Product, Category } = require("../models")

const authorizationProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        
        const product = await Product.findByPk(id)

        if (!product) throw { name: "NotFound", productId: id }

        if (product.authorId === req.user.id || req.user.role === "admin") {
            next()
        } else {
            throw { name: "Forbidden", product }
        }

        // console.log(product,">>>>>>>>>>>>>");
    } catch (err) {
        next(err)
    }
}

const authorizationCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        
        const category = await Category.findByPk(id)

        if (!category) throw { name: "NotFound", categoryId: id }

        if (category.authorId === req.user.id || req.user.role === "admin") {
            next()
        } else {
            throw { name: "Forbidden", category }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authorizationProduct,
    authorizationCategory
}
    