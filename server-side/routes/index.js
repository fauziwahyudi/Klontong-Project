const express = require('express')
const router = express.Router()
const routerUsers = require("./users")
const routerProducts = require("./products")
const routerCategories = require("./categories")
const authentication = require('../middleware/authentication')

router.use("/", routerUsers)

router.use(authentication)
router.use("/products", routerProducts)
router.use("/categories", routerCategories)

module.exports = router