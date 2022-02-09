const cancellationData = require('../data/cancellations')

const getCancellations = async (req, res, next ) => {
    try {
        const cancellations = await cancellationData.getCancellations();
        res.send(cancellations)
    } catch (error) {
        res.status(400).send(error.message)
    }
 }

 const createCancellation = async (req, res) => {
   try {
       const newCancellation = { 
           JobReference,
           DateTime,
           Status,
           Note
       } = req.body

       newCancellation.CreatedOn = new Date().toISOString().slice(0, 19).replace('T', ' '),
       newCancellation.ModifiedOn = new Date().toISOString().slice(0, 19).replace('T', ' ')

       const created = await cancellationData.createCancellation(newCancellation)
       
       res.send(created)

   } catch (error) {
       res.status(400).send(error.message)
   }
}
 
 module.exports = {
    getCancellations,
    createCancellation
 }