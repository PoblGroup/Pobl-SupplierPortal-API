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

const getUserById = async (id) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const list = await pool.request().input('Id', id).query(sqlQueries.getUserById)
        return list.recordset

    } catch (error) {
        return error.message
    }
}

const getUserByEmail = async (username) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const list = await pool.request().input('Username', username).query(sqlQueries.getUserByEmail)

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
            .input ('FullName', sql.NVarChar(150), user.FullName)
            .input ('Username', sql.NVarChar(50), user.Username)
            .input ('Password', sql.NVarChar(150), user.Password)
            .input ('Supplier_Id', sql.NVarChar(50), user.Supplier_Id)
            .input ('Status', sql.Bit, user.Status)
            .input ('IsAdmin', sql.Bit, user.IsAdmin)
            .input ('Direction', sql.NChar(1), user.Direction)
            .input ('CreatedOn', sql.DateTime, user.CreatedOn)
            .input ('ModifiedOn', sql.DateTime, user.ModifiedOn)
            .query(sqlQueries.createUser)
        return insertJob.recordset
    } catch (error) {
        return error.message
    }
}

const updateUser = async (user) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const updateUser = await pool.request()
            .input ('Id', sql.Int, user.Id)
            .input ('FullName', sql.NVarChar(150), user.FullName)
            .input ('Username', sql.NVarChar(50), user.Username)
            .input ('Password', sql.NVarChar(150), user.Password)
            .input ('Supplier_Id', sql.NVarChar(50), user.Supplier_Id)
            .input ('Status', sql.Bit, user.Status)
            .input ('IsAdmin', sql.Bit, user.IsAdmin)
            .input ('Direction', sql.NChar(1), user.Direction)
            .input ('ModifiedOn', sql.DateTime, user.ModifiedOn)
            .query(sqlQueries.updateUser)
        return updateUser.rowsAffected
    } catch (error) {
        return error.message
    }
}





module.exports = {
    getUsers,
    createUser, 
    getUserByEmail,
    getUserById,
    updateUser,
}