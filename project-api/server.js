var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./app/sequelize.js");
const config = require('./app/lib/config.js');
const mysql = require('mysql2/promise');


// Connecting to the database
// const sequelize = new Sequelize(config.database.url, config.database.options);

async function ConnectToDatabase() {
    console.log(`Checking database connection...`);
    try {
        console.log("HERE B4")
        // const connection = await mysql.createConnection({
        //     host: "localhost"
        // });
        // console.lot("HERE")
        const connection = await mysql.createConnection(config.database.url);
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`test_db\`;`);
            console.log(`Database "${config.database}" ensured.`);

        // console.log("Created Database")
        await sequelize.authenticate();
        console.log('Successfully connected to the database');
    } catch (error) {
        console.log('Could not connect to the database. Exiting now...');
        console.log(error.message);
        process.exit(1);
    }
}

var app = express();

app.use(cors());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

async function init() {
    await ConnectToDatabase();


    app.get("/health", function(req, res) {
        res.status(200).send("test-api-server");
    });

    // CRUD Endpoints
    app.use("/recipe", require("./app/routes/recipie.js"));
    

    // start and export server
    let server = app.listen(config.PORT);
    console.log("now listening on port: " + config.PORT + "\n");
};

function stop() {
    server.close(); // Useful for closing server between unit tests
}

init();

module.exports = app;
module.exports.stop = stop;
