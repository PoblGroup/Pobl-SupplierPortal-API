const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

const getAppointments = async () => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('appointments')
        const list = await pool.request().query(sqlQueries.getAppointments)
        return list.recordset

    } catch (error) {
        return error.message
    }
}

// const createAppointment = async (appointment) => {
//     try {
//         let pool = await sql.connect(config.sql)
//         const sqlQueries = await utils.loadSqlQueries('appointments')
//         const insertJob = await pool.request()
//             // .input ('MaintenanceJobRef', sql.NVarChar(50), jobData.maintenanceJobRef)
//             // .input ('SupplierId', sql.NVarChar(50), jobData.supplierId)
//             // .input ('JobDetails', sql.NVarChar(4000), JSON.stringify(jobData.jobDetails))
//             .query(sqlQueries.createJob)
//         return insertJob.recordset
//     } catch (error) {
//         return error.message
//     }
// }

module.exports = {
    getAppointments
}