const bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.use(bodyParser.json())

const gachaRouter = require('./routers/gacha')
app.use('/gacha', gachaRouter)

module.exports = app