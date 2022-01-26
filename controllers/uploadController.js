const jobData = require('../data/jobs')

const createJob = async (req, res) => {
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

const createMulitpleJobs = async (req, res) => {
    const data = req.body
    if (data.length > 0) {
        try {
            const created = await jobData.createMulitpleJobs(data)
            res.send(created)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.status(400).send({ 
            message: 'You need to provide an array, if you want to upload a single job use "/api/uploads"' 
        })
    } 
}

module.exports = {
    createJob,
    createMulitpleJobs
}