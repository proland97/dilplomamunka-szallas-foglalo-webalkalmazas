const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { signupValidation, loginValidation, updateValidation } = require('../validations/authValidation')
const { sendmail } = require('../util/mailer')
const User = require('../models/user')
const { Op } = require("sequelize");

const defaultPassword = 'defaultpassword'
const REGISTRATION_MAIL_SUBJECT = 'Registration Successful!'
const REGISTRATION_MAIL_TEXT = 'Congratulations! \nYou have successfully registered to our website!'
const RESETPASSWORD_MAIL_SUBJECT = 'Your password reseted successfully'
const RESETPASSWORD_MAIL_TEXT = `Your password successfully reseted to ${defaultPassword} \nPlease change it immediately!`

exports.signup = async(req, res) => {

    const { error } = signupValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const usernameExist = await User.findOne({ where: { username: req.body.username } })
    if (usernameExist) return res.status(400).send({ error: 'Username must be unique!' })

    const emailExist = await User.findOne({ where: { email: req.body.email } })
    if (emailExist) return res.status(400).send({ error: 'Email must be unique!' })

    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            // role: req.body.role
        })

        res.status(201).json({ message: 'Signup was successful!' })
        sendmail({
            from: process.env.MAIL_USER,
            to: req.body.email,
            subject: REGISTRATION_MAIL_SUBJECT,
            text: REGISTRATION_MAIL_TEXT
        }).then().catch((err) => { console.log(err); })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.login = async(req, res) => {

    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) return res.status(400).send({ error: 'Email or password is wrong!' })

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send({ error: 'Email or password is wrong!' })

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '10d' }) // set to 1d
    res.send({ authToken: token })
}

exports.update = async(req, res) => {

    const { error } = updateValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        user = await User.findOne({ where: { id: req.user.id } })

        user.username = req.body.username ? req.body.username : user.username
        user.email = req.body.email ? req.body.email : user.email
        if (req.body.password) {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword
        }

        const usernameExist = await User.findOne({
            where: {
                username: user.username,
                id: {
                    [Op.ne]: user.id,
                }
            }
        })
        if (usernameExist) return res.status(400).send({ error: 'Username must be unique!' })

        const emailExist = await User.findOne({
            where: {
                email: user.email,
                id: {
                    [Op.ne]: user.id,
                }
            }
        })
        if (emailExist) return res.status(400).send({ error: 'Email must be unique!' })

        await user.save()
        res.json({ message: 'User updated' })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

exports.deleteUser = async(req, res) => {

    try {
        let user = await User.findOne({ where: { id: req.user.id } })
        if (!user) return res.status(400).send({ error: 'Can not find user' })

        await user.destroy()
        res.json({ message: 'User deleted' })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

exports.resetPassword = async(req, res) => {

    try {
        user = await User.findOne({ where: { id: req.user.id } })
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(defaultPassword, salt);
        user.password = hashedPassword
        await user.save()

        res.status(201).json({ message: 'Password reset was successful' })
        sendmail({
            from: process.env.MAIL_USER,
            to: req.user.email,
            subject: RESETPASSWORD_MAIL_SUBJECT,
            text: RESETPASSWORD_MAIL_TEXT
        }).then().catch((err) => { console.log(err); })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}