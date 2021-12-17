const jobData = require('../data/jobs')

const getJobs = async (req, res, next ) => {
   try {
       const jobs = await jobData.getJobs();
       res.send(jobs)
   } catch (error) {
       res.status(400).send(error.message)
   }
}

module.exports = {
    getJobs
}