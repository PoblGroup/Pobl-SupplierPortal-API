const express = require('express')
const auth = require('../helpers/verifyToken')
const cancellationController = require('../controllers/cancellationController.js')
const router = express.Router()

const { getCancellations, createCancellation  } = cancellationController

router.get('/', auth, getCancellations)
router.post('/', auth, createCancellation)

module.exports = {
    routes: router
}