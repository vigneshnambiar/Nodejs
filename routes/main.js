const express = require('express')
const routers = express.Router()

const {login,dashboard} = require('../controllers/main')
const authorization = require('../middleware/auth')

routers.route('/login').post(login)
routers.route('/dashboard').get(authorization,dashboard)

module.exports = routers