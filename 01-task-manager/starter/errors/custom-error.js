class CustomAPIError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const createCustomError = (message, status) => {
    return new CustomAPIError(message, status);
};

module.exports = { createCustomError, CustomAPIError };
