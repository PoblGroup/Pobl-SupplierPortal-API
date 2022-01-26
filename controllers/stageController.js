const stageData = require('../data/stages')

const getStages = async (req, res, next ) => {
   try {
        const stages = await stageData.getStages();
        res.send(stages)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createStage = async (req, res) => {
    try {
        const newStage = { 
            JobReference,
            DateTime,
            Status,
            Note,
            Outcome,
            OutcomeNarrative
        } = req.body

        newStage.CreatedOn = new Date().toISOString().slice(0, 19).replace('T', ' '),
        newStage.ModifiedOn = new Date().toISOString().slice(0, 19).replace('T', ' ')

        console.log("Create Stage")

        const created = await stageData.createStage(newStage)
        res.send(created)
        // res.status(201).json({
        //     id: created[0].Id,
        //     stage: newStage
        // })

    } catch (error) {
        console.log("error")
        // res.status(400).send(error.message)
    }
}

module.exports = {
    getStages, 
    createStage
}