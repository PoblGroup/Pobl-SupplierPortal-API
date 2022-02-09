const appointmentData = require('../data/appointments')

const getAppointments = async (req, res, next ) => {
   try {
      const appointments = await appointmentData.getAppointments();
      res.send(appointments)
   } catch (error) {
         res.status(400).send(error.message)
   }
}

const createAppointment = async (req, res) => {
   try {
       const newAppointment = { 
         JobReference,
         DateTime,
         SendSMS,
         Note,
         AppointmentOutcome,
         ExternalReference
       } = req.body

       newAppointment.CreatedOn = new Date().toISOString().slice(0, 19).replace('T', ' '),
       newAppointment.ModifiedOn = new Date().toISOString().slice(0, 19).replace('T', ' ')

       console.log(newAppointment)

       const created = await appointmentData.createAppointment(newAppointment)

       res.send(created);

   } catch (error) {
       res.status(400).send(error.message)
   }
}
 
 module.exports = {
    getAppointments,
    createAppointment
 }