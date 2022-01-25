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
            .input ('JobReference', sql.NVarChar(50), variation.JobReference)
            .input ('DateTime', sql.DateTime, variation.Date)
            .input ('SequenceNo', sql.Int, variation.SequenceNo) 
            .input ('Action', sql.NVarChar(50), variation.Action)
            .input ('Product', sql.NVarChar(250), variation.Product)
            .input ('SubLocation', sql.NVarChar(250), variation.SubLocation)
            .input ('Quantity', sql.Int, variation.Quantity)
            .input ('JobTotalValue', sql.Decimal, variation.JobTotalValue)
            .input ('Direction', sql.NChar(1), variation.Direction)
            .input ('CreatedOn', sql.DateTime, new Date(variation.CreatedOn))
            .input ('ModifiedOn', sql.DateTime, new Date(variation.ModifiedOn))
            .query(sqlQueries.createVariation)
        return insertVariation.recordset
    } catch (error) {
        return error.message
    }
}

module.exports = {
    createVariation
}