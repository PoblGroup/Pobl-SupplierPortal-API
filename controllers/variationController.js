const variationData = require('../data/variations')

const createVariation = async (req, res) => {
    res.json({message: "Test"})

    try {
        const { MaintenanceJobVariation } = req.body

        const newVariation = {
            JobReference: MaintenanceJobVariation.JobReference,
            Date: MaintenanceJobVariation.DateTime,
            SequenceNo: MaintenanceJobVariation.SequenceNo,
            Action: MaintenanceJobVariation.Action,
            Product: MaintenanceJobVariation.Product,
            SubLocation: MaintenanceJobVariation.SubLocation,
            Quantity: MaintenanceJobVariation.Quantity,
            JobTotalValue: MaintenanceJobVariation.JobTotalValue,
            CreatedOn: new Date().toISOString().slice(0, 19).replace('T', ' '),
            ModifiedOn: new Date().toISOString().slice(0, 19).replace('T', ' ')
        } 
        
        const created = await variationData.createVariation(newVariation)
        // res.send(created)
        console.log(newVariation)
        console.log(created)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports = {
    createVariation
}