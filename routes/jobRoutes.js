const express = require('express')
const { getJobs, getJobByRef, createJob } = require('../controllers/jobsController.js')
const router = express.Router()
const auth = require('../helpers/verifyToken')
const multer = require('multer')

const upload = multer()

router.route('/').get(auth, getJobs).post(auth, upload.single('jobImage'), createJob)
router.route('/:ref').get(auth, getJobByRef)

module.exports = {
    routes: router
}