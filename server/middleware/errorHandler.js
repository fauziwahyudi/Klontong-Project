const Multer = require('multer');

const errorHandler = (error, req, res, next) => {

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'AggregateError') {
        res.status(400).json({ message: error.errors[0].message });
    } else if (error.name === "JsonWebTokenError" || error.name === "InvalidToken") {
        res.status(401).json({ message: `Invalid Token` });
    
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = errorHandler;
