const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

// const getVariations = async () => {
//     try {
//         let pool = await sql.connect(config.sql)
//         const sqlQueries = await utils.loadSqlQueries('jobs')
//         const list = await pool.request().query(sqlQueries.jobsList)
//         return list.recordset

//     } catch (error) {
//         return error.message
//     }
// }

const createVariation = async (variation) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('variations')
        const insertVariation = await pool.request()
            .input ('MaintenanceJobRef', sql.NVarChar(50), variation.JobReference)
            .input ('DateTime', sql.DateTime, variation.DateTime)
            .input ('SequenceNo', sql.Int, variation.SequenceNo)
            .input ('Action', sql.NVarChar(50), JSON.stringify(variation.Action))
            .input ('Product', sql.NVarChar(250), JSON.stringify(variation.Product))
            .input ('SubLocation', sql.NVarChar(250), JSON.stringify(variation.SubLocation))
            .input ('Quantity', sql.Int, variation.Quantity)
            .input ('JobTotalValue', sql.Decimal, variation.JobTotalValue)
            .input ('CreatedOn', sql.DateTime, variation.CreatedOn)
            .input ('ModifiedOn', sql.DateTime, variation.ModifiedOn)
            .query(sqlQueries.createVariation)
        return insertVariation.recordset
    } catch (error) {
        return error.message
    }
}

module.exports = {
    createVariation
}