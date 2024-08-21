const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;

const authorisation = (role) => {
    return (req, res, next) => {
        let user = req.signedCookies.user;
        if (user && user.token) {
            try {
                const decoded = jwt.verify(user.token, config.TOKEN_KEY);
                if (convertToRole(decoded.user.account_type) >= convertToRole(role)) {
                    return next();
                }
            } catch (error) {
                console.log("Token verification failed:", error);
            }
        }
        console.log("Not authorised.");
        return res.status(401).send({
            auth: false,
            message: "You are not authorised to access this page.",
            status: 401,
            payload: null,
        });
    };
};

const convertToRole = (role) => {
    switch (role) {
        case "user":
            return 1;
        case "admin":
            return 2;
        default:
            return 0;
    }
}

module.exports = authorisation;