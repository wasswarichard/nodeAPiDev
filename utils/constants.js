module.exports = Object.freeze({
    400 : 'Bad Request',
    403 : '',
    RUNNING : 'True dev APi running',
    MAX_PROFILE_PICTURE_UPLOAD_SIZE: 8 * 1024 * 1024,
    SESSION_TIMEOUT_RESPONSE: {
        status: "SESSION_TIMEOUT",
        message: "User session timed out"
    },
    INVALID_JWT_TOKEN_RESPONSE: {
        "status": "INVALID_JWT_TOKEN",
        "message": "Invalid JWT token"
    },
    MISSING_MANDATORIES_ERROR_RESPONSE: {
        name: "ValidationError",
        message: "One or more required fields missing."
    }
});