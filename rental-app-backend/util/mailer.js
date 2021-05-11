const nodemailer = require('nodemailer')
require("dotenv").config()

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
})

const sendmail = (mailOptions) => {
    return transporter.sendMail(mailOptions)
}

exports.sendmail = sendmail