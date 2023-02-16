const userSchema = require('../../models/user')

exports.createUser = async (req, res) => {
    const userDetails = new userSchema({
        uName: req.body.uName,
        email: req.body.uEmail,
        phno: req.body.uPhno,
        date: req.body.date,
        password: req.body.uPassword
    })
    try {
        const newUser = await userDetails.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
