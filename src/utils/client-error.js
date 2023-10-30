const AppError = require('./error-handler');
const {StatusCodes} = require('http-status-codes');

class ClientError extends AppError {
    constructor(name, message, explanation, statusCode) {
        super(
            name,
            message,
            explanation,
            this.statusCode
        );
    }
}

module.exports = ClientError;