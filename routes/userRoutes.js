const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const auth = require('../helpers/verifyToken');

const { getUsers, registerUser } = userController

router.get('/', auth, getUsers)
router.post('/register', auth, registerUser)
// router.post('/login', createJob)

module.exports = {
    routes: router
}