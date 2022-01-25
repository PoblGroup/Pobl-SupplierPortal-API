const express = require('express')
const variationController = require('../controllers/variationController')
const router = express.Router()

const { createVariation } = variationController

router.post('/', createVariation)

module.exports = {
    routes: router
}