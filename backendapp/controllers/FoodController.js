const database = require('../model/DataConnection')

exports.getAllFoods = async (req, res) => {
    try {
        const ret = await database.getAllFoods(req.params.userId)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: `DB Error: ${error.message}` });
    }
}

exports.addNewFood = async (req, res) => {
    try {
        const ret = await database.addNewFoods(req.params.userId, req.body)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't add food: " + error.message });
    }
}

exports.updateFood = async (req, res) => {
    try {
        const ret = await database.updateFood(req.params.userId, req.params.foodId, req.body)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't update note: " + error.message });
    }
}

exports.deleteFood = async (req, res) => {
    try {
        const ret = await database.deleteFood(req.params.userId, req.params.foodId)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't delete food: " + error.message });
    }
}
