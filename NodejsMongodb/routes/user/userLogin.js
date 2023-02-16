const userSchema = require('../../models/user')

exports.userLogin = async (req, res) => {
    await userSchema
        .where('uName').equals(req.body.name)
        .where('password').equals(req.body.password)
        .select(['_id', 'uName'])
        .exec((err, docs) => {
            if (err) {
                console.log("err", err.message);
                res.send(err).status(400)
            }
            else {
                console.log("Second function call : ", docs);
                res.send(docs).status(200)
            }
        })
}