
const uploadJobs = async (req, res) => {
    const jobUploads = req.body
    const errors = []
    const jobsCreated = 0

    if(jobUploads.length > 0) {
        jobUploads.map(job => {
            // Check for job ref
            // Check for supplier id
            let newJob = {
                jobRef: job.jobRef,
                supplier: job.supplier,
                details: job.details
            }
            // Create new job into database
            if (created) {
                jobsCreated++
            } else {
                errors.push({ message: `Could not create record for ${newJob.jobRef}`})
            }
        })

        res.status(200).json({
            status: 200,
            jobsCreated,
            errors
        })
    }

    res.status(400).json({
        message: 'No jobs provided. Please ensure you provide an array of jobs.'
    })
}


export { uploadJobs };