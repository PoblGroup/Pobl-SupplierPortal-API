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

const createAppointment = async (appointment) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('appointments')
        const insertJob = await pool.request()
            .input ('JobReference', sql.NVarChar(50), appointment.JobReference)
            .input ('DateTime', sql.DateTime, appointment.DateTime)
            .input ('Note', sql.NVarChar(250), appointment.Note)
            .input ('SendSMS', sql.Bit, appointment.SendSMS)
            .input ('AppointmentOutcome', sql.NVarChar(250), appointment.AppointmentOutcome)
            .input ('ExternalReference', sql.NVarChar(50), appointment.ExternalReference)
            .input ('CreatedOn', sql.DateTime, appointment.CreatedOn)
            .input ('ModifiedOn', sql.DateTime, appointment.ModifiedOn)
            .query(sqlQueries.createAppointment)
        return insertJob.recordset
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getAppointments,
    createAppointment
}