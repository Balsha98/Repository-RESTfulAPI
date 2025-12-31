// Imported modules.
const mysql = require("mysql");

// Class
class Database {
    #dbConn;
    #DB = "company_data";
    #HOST = "localhost";
    #USER = "root";
    #PASS = "";

    /**
     * Default constructor.
     */
    constructor() {
        this.#connect();
    }

    /**
     * Connecting to database.
     */
    #connect() {
        this.#dbConn = mysql.createConnection({
            host: this.#HOST,
            database: this.#DB,
            user: this.#USER,
            password: this.#PASS,
            dateStrings: true,
        });
    }

    /**
     * Method for executing regular statements.
     *
     * @param {string} queryStr sql query.
     * @returns query result as a Promise.
     */
    async query(queryStr) {
        return new Promise((resolve, _) => {
            this.#dbConn.query(queryStr, (_, response) => {
                resolve(response);
            });
        });
    }

    /**
     * Method for executing prepared statements.
     *
     * @param {string} queryStr sql query.
     * @param {Array} params array of parameters.
     * @returns query result as a Promise.
     */
    async query(queryStr, params) {
        return new Promise((resolve, _) => {
            this.#dbConn.query(queryStr, params, (_, response) => {
                resolve(response);
            });
        });
    }
}

// Default export.
export default Database;
