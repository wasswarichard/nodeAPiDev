const atob = require("atob");
const _ = require("underscore");
const { SESSION_TIMEOUT_RESPONSE, INVALID_JWT_TOKEN_RESPONSE } = require("../utils/Constants");
const publicEndpointPaths = ["/recipe","/proxy", "/test"];
const authenticateEndpoint = (request, response, next) => {
    if (request.url.match(/\.(css|js)$/g) || publicEndpointPaths.some(path => request.url.match(new RegExp(`^${RegExp.escape(path)}`)))) {
        next();
    } else if (request.headers.authentication && request.headers.authentication.match(/^[\w-=]{30,}\.[\w-=]{140,}\.[\w-=]{35,}$/g)) {
        try {
            const sessionExpiry = new Date(JSON.parse(atob(request.headers.authentication.split('.')[1])).exp * 1000);
            if (process.env.ENV === "TEST" || sessionExpiry > Date.now()) {
                response.set(_.pick(request.headers, ["authentication"]));
                next();
            } else {
                response.status(401).send(SESSION_TIMEOUT_RESPONSE);
            }
        } catch (exception) {
            console.error(exception);
            response.status(401).send(INVALID_JWT_TOKEN_RESPONSE);
        }
    } else {
        response.status(401).send(INVALID_JWT_TOKEN_RESPONSE);
    }
};

exports.authenticateEndpoint = authenticateEndpoint;