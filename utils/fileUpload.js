const multer = require('multer')
const path = require('path')

// console.log(path.join(__dirname, '../public/uploads/images'));

const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/images'))
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage:photoStorage})

module.exports = upload