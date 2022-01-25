const express = require('express')
const jobsController = require('../controllers/jobsController.js')
const router = express.Router()

const { getJobs } = jobsController

router.get('/', getJobs)

module.exports = {
    routes: router
}