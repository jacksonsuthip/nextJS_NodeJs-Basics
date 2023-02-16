const userSchema = require('../../models/user')

exports.findUname = async (req, res) => {
    let val = false
    try {
        const uname = await userSchema.find({
            uName: req.body.name
        })
        if (uname.length == 1) { val = true }
        res.send(val).status(200)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


