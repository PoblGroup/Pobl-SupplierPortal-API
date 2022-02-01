const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

const getUsers = async () => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const list = await pool.request().query(sqlQueries.getUsers)
        return list.recordset

    } catch (error) {
        return error.message
    }
}

const createUser = async (user) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const insertJob = await pool.request()
            .input ('Username', sql.NVarChar(50), user.Username)
            .input ('Password', sql.NVarChar(150), user.Password)
            .input ('Supplier_Id', sql.NVarChar(50), user.Supplier_Id)
            .input ('IsAdmin', sql.Bit, user.IsAdmin)
            .input ('CreatedOn', sql.DateTime, user.CreatedOn)
            .input ('ModifiedOn', sql.DateTime, user.ModifiedOn)
            .query(sqlQueries.createUser)
        return insertJob.recordset
    } catch (error) {
        return error.message
    }
}

const getUserByEmail = async (username) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const list = await pool.request().input('Username', username).query(sqlQueries.getUserByEmail)

        return (list.recordset.length > 0) ? true : false
    } catch (error) {
        return error.message
    }
}



module.exports = {
    getUsers,
    createUser, 
    getUserByEmail
}