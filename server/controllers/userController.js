const { User } = require("../models")


class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const createUser = await User.create({ username, email, password, role: "admin", phoneNumber, address })

            res.status(201).json({ message: `user with id ${createUser.id} and email ${createUser.email} has been created` })
            
        } catch (error) {
           next(error)
        }
    }
}

module.exports = UserController