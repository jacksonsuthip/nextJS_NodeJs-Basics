const loginSchema = require('../../../models/login')

exports.loginDetails = async (req, res) => {
    var ip = req.socket.remoteAddress;
    console.log("ip-", ip)
    const saveLogin = new loginSchema({
        id: req.body.id,
        uName: req.body.name,
        sysIP: ip
    })
    try {
        const newLogin = await saveLogin.save()
        res.status(201).json(newLogin)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
