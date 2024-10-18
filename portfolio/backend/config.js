"use strict"

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "Kail and Torrance are the real Protagonist and Antagonist";

const PORT = process.env.PORT || 3001;

const getDatabaseURI = () => {
    return(process.env.NODE_ENV === "test")
        ? "portfolio_test"
        : process.env.DATABASE_URL || "portfolio";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1:14;

console.log("________________________________________________".blue);
console.log("Portfolio Config: ".green);
console.log("Secret Key: ".yellow, SECRET_KEY);
console.log("Port: ".yellow, PORT);
console.log("BCRYPT Work Factor: ".yellow, BCRYPT_WORK_FACTOR);
console.log("Database: ".yellow, getDatabaseURI());
console.log("________________________________________________".blue);

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseURI,
};