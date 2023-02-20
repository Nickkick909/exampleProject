require("dotenv").config({ silent: true });

let config = {
    PORT: process.env.PORT || 3001,
    SCOPE_API_IDENTIFIER: process.env.SCOPE_API_IDENTIFIER || "development",
    database: {
        url: process.env.DB_CONNECTION_STRING || "mysql://root:pwd@mysql:3306",
        //url: process.env.DB_CONNECTION_STRING || "postgresql://postgres:brettsean4000@postgres", // remote dev database
        options: {
            pool: {
                max: 10,
                min: 0,
                idle: 20000,
            },
            dialect: "mysql",
            logging: false
        },
    }
};

module.exports = config;
