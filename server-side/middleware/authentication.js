const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { name: "InvalidToken" }
        }

        const payload = verifyToken(access_token)
        if (!payload) {
            throw { name: "InvalidToken" }
        }
        const user = await User.findByPk(payload.id)

        if (!user) {
            throw { name: "InvalidToken" }
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication