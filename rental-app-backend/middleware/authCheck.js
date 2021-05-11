const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.authCheck = async(req, res, next) => {

    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).send({ error: 'Access Denied' })

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        let user = await User.findOne({ where: { id: decoded.id } })

        if (!user) return res.status(403).send({ error: 'Invalid token' })

        req.user = user
        next()
    } catch (error) {
        return res.status(403).send({ error: 'Invalid token' })
    }
}

exports.authCheckAdmin = async(req, res, next) => {

    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).send({ error: 'Access Denied' })

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = await User.findOne({ where: { id: decoded.id } })

        if (req.user.role !== 'admin') return res.status(403).send({ error: 'Access Denied' })

        next()
    } catch (error) {
        return res.status(403).send({ error: 'Invalid token' })
    }
}