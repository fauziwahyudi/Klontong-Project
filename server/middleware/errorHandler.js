const Multer = require('multer');

const errorHandler = (error, req, res, next) => {

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'AggregateError') {
        res.status(400).json({ message: error.errors[0].message });
    } else if (error.name === "JsonWebTokenError" || error.name === "InvalidToken") {
        res.status(401).json({ message: `Invalid Token` });
    } else if (error.name === "NotFound") {
        if (error.productId) {
            res.status(404).json({ message: `Product ${error.productId} not found` });
        } else if (error.categoryId) {
            res.status(404).json({ message: `Category ${error.categoryId} not found` });
        } else {
            res.status(404).json({ message: `Not found` });
        }
    } else if (error.name === "Forbidden") {
        res.status(403).json({ message: `You don't have access to modify ${error.product.name}` });
    } else if (error.name === "CantNotAdd") {
        res.status(400).json({ message: "Product already exists" });
    } else if (error instanceof Multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ message: 'File size exceeds the limit of 100KB.' });
        } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            res.status(400).json({ message: 'Only JPEG and PNG images are allowed.' });
        }
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = errorHandler;
