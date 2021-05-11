const fs = require('fs')
const { paramValidation, imageUploadValidation } = require('../validations/commonValidation')
const Apartment = require('../models/apartment')
const Image = require('../models/image')
const upload = require('../middleware/upload')

exports.uploadImages = async(req, res) => {
    try {
        await upload(req, res)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }

    if (!Array.isArray(req.files) || !req.files.length) {
        return res.status(400).send({ error: "No files added" })
    }

    const { error } = imageUploadValidation(req.body)
    if (error) {
        deleteFiles(req.files)
        return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })
    }

    const apartment = await Apartment.findOne({ where: { id: req.body.apartmentId } })
    if (!apartment) {
        deleteFiles(req.files)
        return res.status(400).send({ error: "Apartment is not found, with the given id" })
    }

    let imageErr
    await req.files.forEach(async(file) => {

        try {
            await apartment.createImage({
                format: file.mimetype,
                path: file.path,
                isCoverImage: false
            })
        } catch (error) {
            imageErr = error
        }
    })

    if (imageErr) return res.status(500).json({ error: error.message })
    res.json({ message: 'Files uploaded' })
}

exports.deleteImage = async(req, res) => {
    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        const image = await Image.findOne({ where: { id: req.params.id } })
        if (!image) return res.status(400).json({ error: 'Image not found, with the given id' })

        await image.destroy()
        res.json({ message: 'Image deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

deleteFiles = (files) => {
    files.forEach((file) => {
        try {
            fs.unlinkSync(file.path);
        } catch (error) {
            console.log(error);
        }
    })
}