const express = require('express')
const jobsController = require('../controllers/jobsController.js')
const router = express.Router()
const auth = require('../helpers/verifyToken')

const { getJobs, getJobByRef } = jobsController

router.get('/', auth, getJobs)
router.get('/:ref', auth, getJobByRef)

module.exports = {
    routes: router
}