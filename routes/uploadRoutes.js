const express = require('express')
const uploadController = require('../controllers/uploadController')
const router = express.Router()
const auth = require('../helpers/verifyToken')

const { createJob, createMulitpleJobs } = uploadController

router.post('/job', auth, createJob)
router.post('/multiple', auth, createMulitpleJobs)

module.exports = {
    routes: router
}