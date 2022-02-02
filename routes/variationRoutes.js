const express = require('express')
const variationController = require('../controllers/variationController')
const router = express.Router()
const auth = require('../helpers/verifyToken')

const { createVariation } = variationController

router.post('/', auth, createVariation)

module.exports = {
    routes: router
}