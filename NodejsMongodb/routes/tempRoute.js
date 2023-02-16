const express = require('express')
const router = express.Router()
const tempSchema = require('../models/tempModels')

// getting all
router.get('/', async (req, res) => {
    try {
        const tempDetails = await tempSchema.find()
        res.send(tempDetails);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// getting one
router.get('/:id', getUser, (req, res) => {
    res.send(res.userVal);
    console.log("req-", res.userVal.name);
})
// Delete one
router.delete('/delete/:id', getUser, async (req, res) => {
    try {
        await res.userVal.remove()
        res.json({ message: "Deleted Succes" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// update
router.patch('/update/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.userVal.name = req.body.name
    }
    ((req.body.phno != null) && (res.userVal.phno = req.body.phno))
    try {
        const updateTemp = await res.userVal.save()
        res.status(200).json(updateTemp)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// create one
router.post('/create', async (req, res) => {
    const tempDetails = new tempSchema({
        name: req.body.name,
        phno: req.body.phno
    })
    try {
        const tempNew = await tempDetails.save()
        res.status(201).json(tempNew)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// middleware
async function getUser(req, res, next) {
    let userID
    try {
        userID = await tempSchema.findById(req.params.id)
        if (userID == null) {
            return res.status(404).json({ message: "cannot find user" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.userVal = userID
    next()
}


module.exports = router