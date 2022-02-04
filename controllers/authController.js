const bcrypt = require('bcryptjs');
const userData = require('../data/users');
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../helpers/validation");

const authorizeUser = async (req, res, next ) => {
    const { Username, Password } = req.body

    // Validate with Joi
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Find user in database - Will need to change this get user to return obj
    const user = await userData.getUserByEmail(Username);
    if(user.length == 0) return res.status(400).send('Username already in use.')

    // Check Password
    const validPassword = await bcrypt.compare(Password, user[0].Password)
    if(!validPassword) return res.status(400).send('Invalid password')

    console.log(process.env.JWT_TOKEN_SECRET);

    // Generate Auth Token 
    const token = jwt.sign({ _id: user[0].Id, supplierId: user[0].Supplier_Id }, process.env.JWT_TOKEN_SECRET)
    res.header('auth-token', token).send({ "auth-token": token })
}
 
 module.exports = {
    authorizeUser
 }