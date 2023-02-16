const express = require('express')
const router = express.Router()
const { checkUser } = require('./user/auth/checkUser')

// create user
const userCreateRoute = require('../routes/user/userCreate')
router.post('/user/create', userCreateRoute.createUser)

//list user
const userList = require('../routes/user/allUser')
router.get('/user/all', userList.listUser)

// login
const UserLogin = require('../routes/user/userLogin')
router.post('/user/login', UserLogin.userLogin)

// find username
const UserName = require('../routes/user/findUname')
router.post('/user/uname', UserName.findUname)

// check user Middlewere
router.get('/user/get', checkUser, (req, res) => {
    res.send(res.userVal);
})

// login detail save
const loginUser = require('../routes/user/login/loginDetail')
router.post('/user/login/save', loginUser.loginDetails)


module.exports = router