const express = require('express')
const stageController = require('../controllers/stageController.js')
const router = express.Router()
const auth = require('../helpers/verifyToken')

const { getStages, createStage } = stageController

router.get('/', auth, getStages)
router.post('/', auth, createStage)

module.exports = {
    routes: router
}