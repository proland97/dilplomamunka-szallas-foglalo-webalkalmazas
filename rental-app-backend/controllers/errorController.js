const { logger } = require('../util/logger')

exports.notFoundError = async(req, res, next) => {
    res.status(404).json({ error: '404 error' })
}

exports.serverError = async(err, req, res, next) => {
    console.log(err);
    logger.error(err);
    res.status(500).json({ error: err.message })
}