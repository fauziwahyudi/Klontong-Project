const { Category } = require('../models/index')

class CategoryController {
    static async readAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll()
            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }

    static async addCategory(req, res, next) {
        try {
            const newCategory = await Category.create({
                name: req.body.name
            })

            res.status(200).json(newCategory)

        } catch (error) {
            next(error)
        }
    }

    static async editCategory(req, res, next) {
        try {
            const { id } = req.params

            await Category.findByPk(id)

            const { name } = req.body

            await Category.update({ name }, { where: { id } })

            res.status(200).json({ message: "success updated" })

        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params

            const category = await Category.findByPk(id)

            await Category.destroy({ where: { id } })

            res.status(200).json({ message: `${category.name} success deleted` })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController
