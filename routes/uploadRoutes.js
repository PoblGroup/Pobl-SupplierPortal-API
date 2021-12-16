import express from 'express'
import { uploadJobs } from '../controllers/uploadController.js';

const router = express.Router()

router.route('/').get().post(uploadJobs)

export default router;