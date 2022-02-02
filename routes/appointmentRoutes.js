const express = require('express')
const appointmentController = require('../controllers/appointmentController.js')
const router = express.Router()
const auth = require('../helpers/verifyToken')

const { getAppointments, createAppointment } = appointmentController

router.get('/', auth, getAppointments)
router.post('/', auth, createAppointment)

module.exports = {
    routes: router
}