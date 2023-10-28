const database = require('../model/DataConnection')

exports.getAllNotes = async (req, res) => {
    try {
        const ret = await database.getAllNotes(req.params.userId)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: `DB Error: ${error.message}` });
    }
}

exports.addNewNote = async (req, res) => {
    try {
        const ret = await database.addNewNote(req.params.userId, req.body)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't add note: " + error.message });
    }
}

exports.updateNote = async (req, res) => {
    try {
        const ret = await database.updateNote(req.params.userId, req.params.noteId, req.body)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't update note: " + error.message });
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const ret = await database.deleteNote(req.params.userId, req.params.noteId)
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't delete note: " + error.message });
    }
}
