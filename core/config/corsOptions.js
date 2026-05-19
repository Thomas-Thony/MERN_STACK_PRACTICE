const allowedOrigins = require("./allowOrigins")

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Non autorisé par les cors !'))
        }
    },
    credentials: true,
    optionSuccessStatus: 200
}

module.exports = corsOptions