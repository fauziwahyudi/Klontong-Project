const Multer = require('multer');

const storage = Multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPEG and PNG images are allowed.'), false);
    }
};

const upload = Multer({
    storage,
    fileFilter,
});

module.exports = upload;
