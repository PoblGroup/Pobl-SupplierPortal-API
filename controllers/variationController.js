const variationData = require('../data/variations')

const createVariation = async (req, res) => {
    try {
        const newVariation = { 
            JobReference,
            DateTime,
            VariationType,
            SequenceNumber,
            Product,
            WriteInProduct,
            Unit,
            PricePerUnit,
            Quantity,
            TotalAmount,
            SubLocation,
            Note,
            Direction
        } = req.body

        newVariation.SubLocation = (SubLocation == null) ? null : SubLocation.toUpperCase(),
        newVariation.Direction = (Direction == null) ? "I" : Direction.toUpperCase(),
        newVariation.CreatedOn = new Date().toISOString().slice(0, 19).replace('T', ' '),
        newVariation.ModifiedOn = new Date().toISOString().slice(0, 19).replace('T', ' ')
        
        console.log(newVariation)
        
        const created = await variationData.createVariation(newVariation)
        res.send(created)


    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports = {
    createVariation
}