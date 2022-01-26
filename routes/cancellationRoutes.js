const express = require('express')
const cancellationController = require('../controllers/cancellationController.js')
const router = express.Router()

const { getCancellations } = cancellationController

router.get('/', getCancellations)

module.exports = {
    routes: router
}