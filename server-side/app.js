if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
} 

const express = require('express')
const app = express()

const cors = require('cors')

const errorHandler = require('./middleware/errorHandler')
const router = require('./routes')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)


app.use(errorHandler)

module.exports = app




