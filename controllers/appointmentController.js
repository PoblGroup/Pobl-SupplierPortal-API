const getAppointments = async (req, res, next ) => {
    res.json({ message: "Appointments" })
 }
 
 module.exports = {
    getAppointments
 }