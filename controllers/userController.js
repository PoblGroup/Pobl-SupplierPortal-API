const bcrypt = require('bcryptjs');
const userData = require('../data/users');
const { registerValidation } = require('../helpers/validation');


const getUser = async (req, res) => {
    try {
        const user = await userData.getUserById(req.params.id);
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

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
        FullName: req.body.FullName,
        Username: req.body.Username,
        Password: hashedPassword,
        Supplier_Id: req.body.Supplier_Id,
        Status: req.body.Status,
        IsAdmin: req.body.IsAdmin,
        Direction: req.body.Direction,
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

const updateUser = async (req, res) => {
    try {
        const { FullName, Username, Supplier_Id, Status, IsAdmin, Direction } = req.body

        // TODO: Validate request

        // Get User
        const user = await userData.getUserById(req.params.id);
        if(!user) return res.send('No User Found')

        // New User Details
        const newUser = {
            Id: user[0].Id,
            FullName: (FullName != null) ? FullName : user[0].FullName,
            Username: (Username != null) ? Username : user[0].Username,
            Supplier_Id: (Supplier_Id != null) ? Supplier_Id : user[0].Supplier_Id,
            Status: (Status != null) ? Status : user[0].Status,
            IsAdmin: (IsAdmin != null) ? IsAdmin : user[0].IsAdmin,
            Direction: (Direction != null) ? Direction : user[0].Direction,
            ModifiedOn: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }

        // Hash New Password
        if(req.body.Password) {
            const salt = await bcrypt.genSalt(10)
            newUser.Password = await bcrypt.hash(req.body.Password, salt)
        } else {
            newUser.Password = user[0].Password
        }

        // Send Update to db
        const rowsAffected = await userData.updateUser(newUser)
        if(rowsAffected.length > 0) {
            res.status(200).send({
                rowsAffected: rowsAffected[0],
                message: `Updated User with Id: ${newUser.Id}`
            })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports = {
    getUsers,
    getUser,
    updateUser,
    registerUser
}