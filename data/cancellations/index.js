const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

const getCancellations = async () => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('cancellations')
        const list = await pool.request().query(sqlQueries.getCancellations)
        return list.recordset

    } catch (error) {
        return error.message
    }
}

const createCancellation = async (stage) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('cancellations')
        const insertJob = await pool.request()
            .input ('JobReference', sql.NVarChar(50), stage.JobReference)
            .input ('DateTime', sql.DateTime, stage.DateTime)
            .input ('Status', sql.NVarChar(250), stage.Status)
            .input ('Note', sql.NVarChar(250), stage.Note)
            .input ('Outcome', sql.NVarChar(50), stage.Outcome)
            .input ('OutcomeNarrative', sql.NVarChar(250), stage.OutcomeNarrative)
            .input ('CreatedOn', sql.DateTime, stage.CreatedOn)
            .input ('ModifiedOn', sql.DateTime, stage.ModifiedOn)
            .query(sqlQueries.createCancellation)
        return insertJob.recordset
    } catch (error) {
        return error.message
    }
}


module.exports = {
    getCancellations,
    createCancellation
}