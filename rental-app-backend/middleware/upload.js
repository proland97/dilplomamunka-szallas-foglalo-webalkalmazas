const multer = require('multer')
const { promisify } = require("util");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images');
    },
    filename: function(req, file, cb) {
        cb(null, Math.random().toString(36).substring(2, 15) + Date.now())
    }
})

const fileFilter = (req, file, cb) => {
    const whitelist = [
        'image/jpeg',
        'image/jpg',
        'image/png'
    ];
    if (!whitelist.includes(file.mimetype)) {
        cb(new Error('This extension is not allowed!'), false);
    } else if (file.originalname.length > 200) {
        cb(new Error('File name is too long, must be less then 200 char long!'), false);
    } else {
        cb(null, true);
    }
}

const upload = multer({ storage: storage, limits: { fileSize: 1204 * 1024 * 5 }, fileFilter: fileFilter }).array('apartmentImage', 10); // 5 MB, max 10 images

module.exports = promisify(upload)