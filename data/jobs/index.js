const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

const getJobs = async (supplierId) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('jobs')
        const list = await pool.request().input('SupplierId', supplierId).query(sqlQueries.jobsList)
        return list.recordset

    } catch (error) {
        return error.message
    }
}

const getJobByRef = async (jobRef) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('jobs')
        const list = await pool.request().input('JobRef', jobRef).query(sqlQueries.getJobByRef)
        return list.recordset

    } catch (error) {
        return error.message
    }
}

const createJob = async (jobData) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('jobs')
        const insertJob = await pool.request()
            .input ('JobReference', sql.NVarChar(50), jobData.jobReference)
            .input ('SupplierId', sql.NVarChar(50), jobData.supplierId)
            .input ('JobExternalReference', sql.NVarChar(50), jobData.jobExternalReference)
            .input ('WorkType', sql.NVarChar(100), jobData.workType)
            .input ('PropertyReference', sql.NVarChar(50), jobData.propertyReference)
            .input ('OccupantReference', sql.NVarChar(50), jobData.occupantReference)
            .input ('Description', sql.NVarChar(500), jobData.description)
            .input ('AccessDetails', sql.NVarChar(500), jobData.accessDetails)
            .input ('ReleaseDate', sql.DateTime, jobData.releaseDate)
            .input ('Priority', sql.NVarChar(50), jobData.priority)
            .input ('TargetApptDate', sql.DateTime, jobData.targetApptDate)
            .input ('TargetCompleteDate', sql.DateTime, jobData.targetCompleteDate)
            .input ('TotalValue', sql.Decimal, jobData.totalValue)
            .input ('Direction', sql.NChar(1), jobData.direction)
            .input ('CreatedOn', sql.DateTime, jobData.createdOn)
            .input ('ModifiedOn', sql.DateTime, jobData.modifiedOn)
            .query(sqlQueries.createJob)
        return insertJob.recordset
    } catch (error) {
        return error.message
    }
}

const createSupplierJob = async (jobData) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('jobs')
        const insertJob = await pool.request()
            .input ('MaintenanceJobRef', sql.NVarChar(50), jobData.maintenanceJobRef)
            .input ('SupplierId', sql.NVarChar(50), jobData.supplierId)
            .input ('JobDetails', sql.NVarChar(4000), JSON.stringify(jobData.jobDetails))
            .query(sqlQueries.createSupplierJob)
        return insertJob.recordset
    } catch (error) {
        return error.message
    }
}

const createMulitpleJobs = async (jobs) => {
    try {
        let pool = await sql.connect(config.sql)

        const table = new sql.Table('SupplierJobs')
        table.create = false
        table.columns.add('MaintenanceJobRef', sql.NVarChar(50), {nullable: false})
        table.columns.add('SupplierId', sql.NVarChar(50), {nullable: false})
        table.columns.add('JobDetails', sql.NVarChar(4000), {nullable: false})
        jobs.forEach(job => table.rows.add(job.maintenanceJobRef, job.supplierId, JSON.stringify(job.jobDetails)));
        
        const insertJobs = await pool.request().bulk(table)
        return insertJobs

    } catch (error) {
        console.log(error)
        return error.message
    }
}

module.exports = {
    getJobs,
    createJob,
    createSupplierJob,
    createMulitpleJobs,
    getJobByRef
}