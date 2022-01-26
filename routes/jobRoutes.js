const express = require('express')
const jobsController = require('../controllers/jobsController.js')
const router = express.Router()

const { getJobs, getJobByRef } = jobsController

router.get('/', getJobs)
router.get('/:ref', getJobByRef)

module.exports = {
    routes: router
}