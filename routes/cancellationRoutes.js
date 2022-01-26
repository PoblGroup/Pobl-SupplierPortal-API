const express = require('express')
const cancellationController = require('../controllers/cancellationController.js')
const router = express.Router()

const { getCancellations, createCancellation  } = cancellationController

router.get('/', getCancellations)
router.post('/', createCancellation)

module.exports = {
    routes: router
}