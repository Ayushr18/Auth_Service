const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
    constructor(
        name = 'AppError',
        message = 'Something went wrong',
        description = 'Something went wrong',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        ) {
        super();
        this.message = message,
        this.description = description,
        this.name = name,
        this.statusCode = statusCode
    }
} 

module.exports = AppError;