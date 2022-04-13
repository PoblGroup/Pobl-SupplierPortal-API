const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

const createProduct = async (product, jobId) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('products')
        const insertJob = await pool.request()
            .input ('ProductId', sql.NVarChar(150), product.productId)
            .input ('Name', sql.NVarChar(150), product.name)
            .input ('Quantity', sql.Int, product.qty)
            .input ('JobId', sql.Int, jobId)
            .query(sqlQueries.createProduct)
        return insertJob.recordset
    } catch (error) {
        return error.message
    }
}


module.exports = {
    createProduct
}