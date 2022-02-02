const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

const { authorizeUser } = authController

router.post('/', authorizeUser )

module.exports = {
    routes: router
}