const express = require('express')
const appointmentController = require('../controllers/appointmentController.js')
const router = express.Router()

const { getAppointments } = appointmentController

router.get('/', getAppointments)

module.exports = {
    routes: router
}