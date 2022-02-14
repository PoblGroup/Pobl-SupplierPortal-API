const jobData = require('../data/jobs')
const { BlobServiceClient } = require('@azure/storage-blob')

const getJobs = async (req, res) => {
    const { supplierId} = req.user
    try {
        const jobs = await jobData.getJobs(supplierId);
        res.send(jobs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getJobByRef = async (req, res) => {
    const jobRef = req.params.ref

    try {
        const job = await jobData.getJobByRef(jobRef);
        res.send(job)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createJob = async (req, res) => {
    const file = req.file
    console.log(file)

    try {
        // New Job
        const newJob = req.body

        // Check to see if JobRef exists
        const existingJob = await jobData.getJobByRef(newJob.maintenanceJobRef)
        
        if(existingJob.length > 0) {
            res.status(400).json({
                message: `Job with ${newJob.maintenanceJobRef} already exists`
            })
        } else {
            const created = await jobData.createJob(newJob)
            res.send(created)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getJobs,
    getJobByRef,
    createJob
}