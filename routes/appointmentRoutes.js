const express = require('express')
const appointmentController = require('../controllers/appointmentController.js')
const router = express.Router()

const { getAppointments, createAppointment } = appointmentController

router.get('/', getAppointments)
router.post('/', createAppointment)

module.exports = {
    routes: router
}