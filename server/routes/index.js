const express = require('express')
const router = express.Router()
const routerUsers = require("./users")
const routerProducts = require("./products")
const authentication = require('../middleware/authentication')

router.use("/", routerUsers)

router.use(authentication)
router.use("/products", routerProducts)

module.exports = router