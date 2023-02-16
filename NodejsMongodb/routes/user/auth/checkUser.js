const userSchema = require('../../../models/user')

const checkUser = async (req, res, next) => {
    let userID
    try {
        userID = await userSchema.findById(req.headers.uid)
        if (userID == null) {
            return res.status(404).json({ message: "cannot find user" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.userVal = userID
    next()
}

module.exports = { checkUser }