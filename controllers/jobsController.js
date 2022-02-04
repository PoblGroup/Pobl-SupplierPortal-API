const jobData = require('../data/jobs')

const getJobs = async (req, res, next ) => {
    const { supplierId} = req.user
    try {
        const jobs = await jobData.getJobs(supplierId);
        res.send(jobs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getJobByRef = async (req, res, next ) => {
    const jobRef = req.params.ref

    try {
        const job = await jobData.getJobByRef(jobRef);
        res.send(job)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getJobs,
    getJobByRef
}