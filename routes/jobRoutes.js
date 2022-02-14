const express = require('express')
const jobsController = require('../controllers/jobsController.js')
const router = express.Router()
const auth = require('../helpers/verifyToken')
const multer = require('multer')

const upload = multer()

const { getJobs, getJobByRef, createJob } = jobsController

router.get('/', auth, getJobs)
router.post('/', auth, upload.single('jobImage'), createJob)
router.get('/:ref', auth, getJobByRef)

module.exports = {
    routes: router
}