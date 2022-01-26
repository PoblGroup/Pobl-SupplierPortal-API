const cancellationData = require('../data/cancellations')

const getCancellations = async (req, res, next ) => {
    res.json({ message: "Cancellations" })
 }

 const createCancellation = async (req, res) => {
   try {
       const newCancellation = { 
           JobReference,
           DateTime,
           Status,
           Note,
           Outcome,
           OutcomeNarrative
       } = req.body

       newCancellation.CreatedOn = new Date().toISOString().slice(0, 19).replace('T', ' '),
       newCancellation.ModifiedOn = new Date().toISOString().slice(0, 19).replace('T', ' ')

       const created = await cancellationData.createCancellation(newCancellation)
       res.status(201).json({
           id: created[0].Id,
           cancellation: newCancellation
       })

   } catch (error) {
       res.status(400).send(error.message)
   }
}
 
 module.exports = {
    getCancellations,
    createCancellation
 }