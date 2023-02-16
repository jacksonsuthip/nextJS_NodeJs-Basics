const userSchema = require('../../models/user')

exports.listUser = async (req, res) => {
    try {
        const list = await userSchema.find()
        res.send(list).status(200)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}