const bcrypt = require('bcryptjs');
const userData = require('../data/users');
const { registerValidation } = require('../helpers/validation');


const getUsers = async (req, res) => {
    try {
        const users = await userData.getUsers();
        res.send(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const registerUser = async (req, res) => {
    // Validate user request with joi
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // Check if user already exists
    const user = await userData.getUserByEmail(req.body.Username);
    if(user.length > 0) return res.status(400).send('Username already in use.')

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.Password, salt)

    // Create new user
    const newUser = {
        Username: req.body.Username,
        Password: hashedPassword,
        Supplier_Id: req.body.Supplier_Id,
        IsAdmin: req.body.IsAdmin,
        CreatedOn: new Date().toISOString().slice(0, 19).replace('T', ' '),
        ModifiedOn: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    try {
        const created = await userData.createUser(newUser)
        res.send(created);
    } catch (error) {
        res.status(500).send(error)
    }
   
}

module.exports = {
    getUsers,
    registerUser
}