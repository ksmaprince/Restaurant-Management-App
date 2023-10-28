const database = require('../model/DataConnection')

exports.signupUser = async (req, res) => {
    try {
        const ret = await database.singupUser(req.body)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: `DB Error: ${error.message}` });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        let ret = await database.loginUser(email, password)
        return res.status(200).send({ success: true, data: ret })
    } catch (error) {
        res.status(500).send({ success: false, error: `Cannot login: ${error.message}` });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const ret = await database.getAllUser()
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: `DB Error: ${error.message}` });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const ret = await database.updateProfile(req.headers.authorization, req.params.userId, req.body)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: `DB Error: ${error.message}` });
    }
}

exports.updateProfileImage = async (req, res) => {
    try {
        const image = req.body;
        const ret = await database.updateProfileImage(req.headers.authorization, req.params.userId, image.url)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: `DB Error: ${error.message}` });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const data = req.body;
        const ret = await database.changePassword(req.params.userId, data)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: `DB Error: ${error.message}` });
    }
}

