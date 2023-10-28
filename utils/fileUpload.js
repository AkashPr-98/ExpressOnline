const multer = require('multer')
const path = require('path')

// console.log(path.join(__dirname, '../public/uploads/images'));

const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/images'))
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname + Date.now())
    }
})

const imageFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new Error('File Type not acceptable'))
    }
}

const upload = multer({
    storage: photoStorage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: imageFilter
})

module.exports = upload