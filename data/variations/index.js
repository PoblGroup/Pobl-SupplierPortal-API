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
            .input ('DateTime', sql.DateTime, variation.DateTime)
            .input ('VariationType', sql.NVarChar(50), variation.VariationType)
            .input ('SequenceNumber', sql.Int, variation.SequenceNumber) 
            .input ('Product', sql.NVarChar(250), variation.Product)
            .input ('WriteInProduct', sql.NVarChar(500), variation.WriteInProduct)
            .input ('Unit', sql.NVarChar(250), variation.Unit)
            .input ('PricePerUnit', sql.Decimal, variation.PricePerUnit)
            .input ('Quantity', sql.Decimal, variation.Quantity)
            .input ('TotalAmount', sql.Decimal, variation.TotalAmount)
            .input ('SubLocation', sql.NVarChar(250), variation.SubLocation)
            .input ('Note', sql.NVarChar(250), variation.Note)
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