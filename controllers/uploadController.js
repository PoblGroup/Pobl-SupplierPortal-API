const jobData = require('../data/jobs')

const createJob = async (req, res) => {
    try {
        const data = req.body
        const created = await jobData.createJob(data)
        res.send(created)
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