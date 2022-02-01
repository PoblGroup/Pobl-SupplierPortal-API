const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

const { getUsers, registerUser } = userController

router.get('/', getUsers)
router.post('/register', registerUser)
// router.post('/login', createJob)

module.exports = {
    routes: router
}