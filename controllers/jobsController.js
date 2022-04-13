const jobData = require('../data/jobs')
const productData = require('../data/products')
const { SPAuth, UploadFile } = require('../helpers/sharepoint');

const getJobs = async (req, res) => {
    const { supplierId} = req.user
    try {
        const jobs = await jobData.getJobs(supplierId);
        res.json(jobs)
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
    const newJob = JSON.parse(req.body.data)
    let addedProducts = []

    newJob.direction = (req.body.direction == null) ? "I" : req.body.direction.toUpperCase(),
    newJob.createdOn = new Date().toISOString().slice(0, 19).replace('T', ' '),
    newJob.modifiedOn = new Date().toISOString().slice(0, 19).replace('T', ' ')

    try {
        // Check to see if JobRef exists
        const existingJob = await jobData.getJobByRef(newJob.jobReference)
        if(existingJob.length > 0) return res.status(400).json({message: `Job with ${newJob.jobReference} already exists`})

        // Create Job
        const createdJob = await jobData.createJob(newJob)

        // Add Products
        if(newJob.products.length > 0) {
            addedProducts = await AddProducts(newJob.products, createdJob[0].Id)
        }

        // Add Job Image
        const uploaded = await Upload(file)

        res.json({
            createdJobId: createdJob[0].Id,
            jobReference: newJob.jobReference,
            jobExternalReference: newJob.jobExternalReference,
            productsAdded: addedProducts.length
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function Upload(file) {
    const site = "https://pobl.sharepoint.com/sites/RMExchange"
    // Get SharePoint Token
    const tokenData = await SPAuth();
    // TODO: Create Folder for Job
    // Upload File to SharePoint
    const fileUpload = await UploadFile(tokenData.access_token, file);

    const { Name, ServerRelativeUrl, UniqueId } = fileUpload.d;
    return {
        Name,
        url: `${site}${ServerRelativeUrl}`,
        UniqueId,
    }
}

async function AddProducts(products, id) {
    const promises = products.map(async (product) => {
        const p = await productData.createProduct(product, id)
        return p[0].Id
    })
    return Promise.all(promises)
}

module.exports = {
    getJobs,
    getJobByRef,
    createJob
}