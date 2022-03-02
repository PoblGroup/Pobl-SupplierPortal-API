const jobData = require('../data/jobs')
const { DefaultAzureCredential } = require('@azure/identity');
const { getContainerSasUri } = require('../helpers/generateSasToken');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const { header } = require('express/lib/request');

const getJobs = async (req, res) => {
    const { supplierId} = req.user
    let supplierJobs = []
    try {
        const jobs = await jobData.getJobs(supplierId);

        jobs.map(job => {

            const jd = JSON.parse(CleanJsonString(job.JobDetails))

            const j = {
                Id: job.Id,
                MaintenanceJobRef: job.MaintenanceJobRef,
                SupplierId: job.SupplierId,
                JobDetails: jd,
                JobDesc: "TEST"
            }
            supplierJobs.push(j)
        })  

        console.log(supplierJobs)
        res.json(supplierJobs)
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
    const newJob = req.body
    const file = req.file
    uploadFileAzure(newJob, file)

    try {
        // Check to see if JobRef exists
        const existingJob = await jobData.getJobByRef(newJob.createnanceJobRef)
        if(existingJob.length > 0) return res.status(400).json({message: `Job with ${newJob.maintenanceJobRef} already exists`})

        // Create Job
        const created = await jobData.createJob(newJob)
        res.send(created)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const uploadFileAzure = (job, file) => {
    const account = "PoblConnect";
    const defaultAzureCredential = new DefaultAzureCredential();
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, defaultAzureCredential);

    async function createContainer() {
        // Create a container
        const containerName = `newcontainer${new Date().getTime()}`;
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const createContainerResponse = await containerClient.create();
        console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
    }
    
    //createContainer();


    // const account = "PoblConnect"
    // const key = "+T6vzvaYVIjKbYF82FSyYdUsW/IcOVYtnu5pj+PoMPCvs/cjSHkDqVNjvx3f6N0ZxVLGS8mDj3OTZUCPA5D2wQ=="
    // const containerName = "test"
    // const storageSharedKeyCredential = new StorageSharedKeyCredential(account, key)
    // const sas = getContainerSasUri(containerName, storageSharedKeyCredential, null)
    // console.log('Token SAS', sas)
    // console.log('?sv=2020-08-04&ss=b&srt=co&sp=ctfx&se=2022-02-15T21:55:29Z&st=2022-02-15T13:55:29Z&spr=https&sig=Y1cSXZ3oCo73RXuqLl%2Fl%2FnrlQe3nookgGzg42AfkFhk%3D')

    // //sv=2020-10-02 & st=2022-02-15T13%3A56%3A07Z & se=2022-02-15T14%3A56%3A07Z & sr=c & sp=c & sig=XnQvhw918i6J82B14ObcE5ac6SsjExtCES40L08%2FkOY%3D
    // //sv=2020-08-04 & ss=b&srt=co & sp=ctfx & se=2022-02-15T21:55:29Z & st=2022-02-15T13:55:29Z & spr=https & sig=Y1cSXZ3oCo73RXuqLl%2Fl%2FnrlQe3nookgGzg42AfkFhk%3D


    // const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);
    // console.log(blobServiceClient)  

    // async function upload() {
    //     const containerClient = blobServiceClient.getContainerClient(containerName);
        
    //     const content = "Hello world!";
    //     const blobName = "newblob" + new Date().getTime();
    //     const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    //     const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    //     console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  
    //     // LIST BLOBS
    //     // let i = 1;
    //     // let blobs = containerClient.listBlobsFlat();
    //     // for await (const blob of blobs) {
    //     //   console.log(`Blob ${i++}: ${blob.name}`);
    //     // }
    // }

    // upload();
}

function CleanJsonString(jsonString) {
    jsonString.replace(/\\n/g, '')
    jsonString.replace(/\\t/g, '')
    return jsonString
}

module.exports = {
    getJobs,
    getJobByRef,
    createJob
}