const express = require('express')
const uploadController = require('../controllers/uploadController')
const router = express.Router()

const { createJob, createMulitpleJobs } = uploadController

router.post('/job', createJob)
// router.post('/variation', createJob)
router.post('/multiple', createMulitpleJobs)

module.exports = {
    routes: router
}