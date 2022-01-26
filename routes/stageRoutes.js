const express = require('express')
const stageController = require('../controllers/stageController.js')
const router = express.Router()

const { getStages } = stageController

router.get('/', getStages)

module.exports = {
    routes: router
}