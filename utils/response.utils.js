
const responseMessage = (status, message, data) => {
    const messageObj = {
        status: status
    };
    if (message) {
        messageObj.message = message;
    }
    if (data) {
        messageObj.payload = data;
    }
    return messageObj;
};

const error = (response, error, message = '', statusCode = 500, payload = {}) => {
    // if a status code was injected into the error -> use that status code
    // and use the error message
    if (error && error.status_code) {
        statusCode = error.status_code;
        // use message entered in the params or the message passed in the error object
        message = message || error.message;
    }

    return response.status(statusCode).json(responseMessage(false, message, payload));
};

const success = (response, payload = {}, statusCode = 200, message = 'success') => {
    return response.status(statusCode).json(responseMessage(true, message, payload));
};

module.exports = {
    error,
    success
};