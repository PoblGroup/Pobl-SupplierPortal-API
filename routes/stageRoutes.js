const express = require('express')
const stageController = require('../controllers/stageController.js')
const router = express.Router()

const { getStages, createStage } = stageController

router.get('/', getStages)
router.post('/', createStage)

module.exports = {
    routes: router
}