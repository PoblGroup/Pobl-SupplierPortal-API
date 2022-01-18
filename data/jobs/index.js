const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

const getJobs = async () => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('jobs')
        const list = await pool.request().query(sqlQueries.jobsList)
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
            .input ('MaintenanceJobRef', sql.NVarChar(50), jobData.maintenanceJobRef)
            .input ('SupplierId', sql.NVarChar(50), jobData.supplierId)
            .input ('JobDetails', sql.NVarChar(4000), JSON.stringify(jobData.jobDetails))
            .query(sqlQueries.createJob)
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
    createMulitpleJobs
}