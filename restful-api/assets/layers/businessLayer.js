"use strict";

// Imported modules.
const DataLayer = require("./dataLayer");
const Department = require("../models/department");
const Employee = require("../models/employee");
const Timecard = require("../models/timecard");
const Validate = require("../helpers/validate");
const Format = require("../helpers/format");
const Message = require("../helpers/message");

// Class
class BusinessLayer {
    #dLayer;

    /**
     * Default constructor.
     */
    constructor() {
        this.#dLayer = new DataLayer();
    }

    // ***** COMPANY ***** //

    /**
     * Deleting a company.
     *
     * @param {string} compName company name.
     * @returns formatted message.
     */
    async deleteCompany(compName) {
        const affectedRows = await this.#dLayer.deleteCompany(compName);
        if (affectedRows === 0) {
            return Format.error(Message.dataExistsError("compName"));
        }

        return Format.success(Message.compDelSuccess(compName));
    }

    // ***** DEPARTMENT ***** //

    /**
     * Getting a department.
     *
     * @param {number} deptID department id.
     * @param {string} compName company name.
     * @returns department as JSON.
     */
    async getDepartment(deptID, compName) {
        const params = [+deptID, compName, "deptID", "compName"];
        for (let i = 0; i < params.length - 2; i++) {
            const exists = await this.#doesExist(params[i + 2], "department", params[i]);
            if (!exists) return Format.error(Message.dataExistsError(params[i + 2]));
        }

        const bound = await this.#areBound(params.slice(2), "department", params.slice(0, 2));
        if (!bound) return Format.error(Message.deptSearchResult(deptID, compName, "not found"));

        return Format.success(await this.#dLayer.getDepartment(deptID, compName));
    }

    /**
     * Getting all departments.
     *
     * @param {string} compName company name.
     * @returns departments list as JSON.
     */
    async getAllDepartments(compName) {
        const exists = await this.#doesExist("compName", "department", compName);
        if (!exists) return Format.error(Message.dataExistsError("compName"));

        return Format.success(await this.#dLayer.getAllDepartments(compName));
    }

    /**
     * Inserting a department.
     *
     * @param {object} dept input object.
     * @returns new department as JSON.
     */
    async insertDepartment(dept) {
        const { error } = Validate.isObjectValid("dept", dept);
        if (error) return Format.error(Message.joiError(error));

        // Input validation.
        const validate = await this.#alterDeptHelper(dept);
        if (validate) return validate;

        return Format.success(await this.#dLayer.insertDepartment(new Department(dept)));
    }

    /**
     * Updating a department.
     *
     * @param {object} dept input object.
     * @returns updated department as JSON.
     */
    async updateDepartment(dept) {
        const parsedObject = JSON.parse(dept);
        if (!parsedObject.deptID) return Format.error(Message.dataExistsError("deptID"));

        // Input validation.
        const validate = await this.#alterDeptHelper(parsedObject);
        if (validate) return validate;

        return Format.success(await this.#dLayer.updateDepartment(new Department(parsedObject)));
    }

    /**
     * Alter department helper.
     *
     * @param {object} dept input object.
     * @returns null || formatted message.
     */
    async #alterDeptHelper(dept) {
        let deptID;
        for (const [key, input] of Object.entries(dept)) {
            if (Validate.isStrEmpty(input)) {
                return Format.error(Message.emptyStrError(key));
            }

            if (key === "deptID") {
                const exists = await this.#doesExist(key, "department", input);
                if (!exists) return Format.error(Message.dataExistsError(key));

                deptID = input;
            } else if (key === "compName") {
                if (Validate.isWrongFormat("str", input, "all")) {
                    return Format.error(Message.dataFormatError(key));
                }
            } else if (key === "deptName") {
                if (Validate.isWrongFormat("str", input, "ltr")) {
                    return Format.error(Message.dataFormatError(key));
                }
            } else if (key === "deptNum") {
                if (Validate.isWrongFormat("str", input, "all")) {
                    return Format.error(Message.dataFormatError(key));
                }

                const values = [input];
                if (deptID) values.unshift(deptID);

                const isUnique = await this.#isNumUnique(["deptID", key], "department", values);
                if (!isUnique) return Format.error(Message.dataValidError(key, "unique"));
            } else if (key === "deptLoc") {
                if (Validate.isWrongFormat("str", input, "ltr")) {
                    return Format.error(Message.dataFormatError(key));
                }
            }
        }
    }

    /**
     * Deleting a department.
     *
     * @param {number} deptID department id.
     * @param {string} compName company name.
     * @returns number of affected rows.
     */
    async deleteDepartment(deptID, compName) {
        const affectedRows = await this.#dLayer.deleteDepartment(deptID, compName);
        if (affectedRows === 0) return Format.error(Message.deptSearchResult(deptID, compName, "not found"));

        return Format.success(Message.deptSearchResult(deptID, compName, "deleted"));
    }

    // ***** EMPLOYEE ***** //

    /**
     * Getting an employee.
     *
     * @param {number} empID employee id.
     * @returns employee as JSON.
     */
    async getEmployee(empID) {
        const exists = await this.#doesExist("empID", "employee", +empID);
        if (!exists) return Format.error(Message.dataExistsError("empID"));

        return Format.success(await this.#dLayer.getEmployee(empID));
    }

    /**
     * Getting all employees.
     *
     * @param {string} compName company name.
     * @returns employees list as JSON.
     */
    async getAllEmployees(compName) {
        const exists = await this.#doesExist("compName", "department", compName);
        if (!exists) return Format.error(Message.dataExistsError("compName"));

        const empList = await this.#dLayer.getAllEmployees(compName);
        if (empList.length === 0) return Format.error(Message.empGetError(compName));

        return Format.success(empList);
    }

    /**
     * Inserting an employee.
     *
     * @param {object} emp input object.
     * @returns new employee as JSON.
     */
    async insertEmployee(emp) {
        const { error } = Validate.isObjectValid("emp", emp);
        if (error) return Format.error(Message.joiError(error));

        const validate = await this.#alterEmpHelper(emp);
        if (validate) return validate;

        return Format.success(await this.#dLayer.insertEmployee(new Employee(emp)));
    }

    /**
     * Updating an employee.
     *
     * @param {object} emp input object.
     * @returns updated employee as JSON.
     */
    async updateEmployee(emp) {
        const parsedObject = JSON.parse(emp);
        if (!parsedObject.empID) return Format.error(Message.dataExistsError("empID"));

        const validate = await this.#alterEmpHelper(parsedObject);
        if (validate) return validate;

        return Format.success(await this.#dLayer.updateEmployee(new Employee(parsedObject)));
    }

    /**
     * Alter employee helper.
     *
     * @param {object} emp input object.
     * @returns null || formatted message.
     */
    async #alterEmpHelper(emp) {
        let empID;
        for (const [key, input] of Object.entries(emp)) {
            if (Validate.isStrEmpty(input)) {
                return Format.error(Message.emptyStrError(key));
            }

            if (key === "empID") {
                const exists = await this.#doesExist(key, "employee", input);
                if (!exists) return Format.error(Message.dataExistsError(key));

                empID = input;
            } else if (key === "deptID") {
                const exists = await this.#doesExist(key, "department", input);
                if (!exists) return Format.error(Message.dataExistsError(key));
            } else if (key === "empName") {
                if (Validate.isWrongFormat("str", input, "ltr")) {
                    return Format.error(Message.dataFormatError(key));
                }
            } else if (key === "empNum") {
                if (Validate.isWrongFormat("str", input, "all")) {
                    return Format.error(Message.dataFormatError(key));
                }

                const values = [input];
                if (empID) values.unshift(empID);

                const isUnique = await this.#isNumUnique(["empID", key], "employee", values);
                if (!isUnique) return Format.error(Message.dataValidError(key, "unique"));
            } else if (key === "hireDate") {
                if (Validate.isWrongFormat("date", input, "dt")) {
                    return Format.error(Message.dataFormatError(key));
                } else if (!Validate.isDateValid(input)) {
                    return Format.error(Message.dataValidError(key, "valid"));
                }
            } else if (key === "jobPos") {
                if (Validate.isWrongFormat("str", input, "ltr")) {
                    return Format.error(Message.dataFormatError(key));
                }
            } else if (key === "salary") {
                if (!Validate.isPositive(input)) {
                    return Format.error(Message.lowerThanZeroError(key));
                }
            } else if (key === "mngID") {
                const exists = await this.#doesExist("empID", "employee", input);
                if (!exists) return Format.error(Message.dataExistsError(key));
            }
        }
    }

    /**
     * Deleting an employee.
     *
     * @param {number} empID employee id.
     * @returns number of affected rows.
     */
    async deleteEmployee(empID) {
        const { affectedRows } = await this.#dLayer.deleteEmployee(empID);
        if (affectedRows === 0) return Format.error(Message.dataExistsError("empID"));

        return Format.success(Message.empAndCardDelSuccess("employee", empID));
    }

    // ***** TIMECARD ***** //

    /**
     * Getting a timecard.
     *
     * @param {number} cardID timecard id.
     * @returns timecard as JSON.
     */
    async getTimecard(cardID) {
        const exists = await this.#doesExist("cardID", "timecard", +cardID);
        if (!exists) return Format.error(Message.dataExistsError("cardID"));

        return Format.success(await this.#dLayer.getTimecard(cardID));
    }

    /**
     * Getting all timecards.
     *
     * @param {number} empID employee id.
     * @returns timecards list as JSON.
     */
    async getAllTimecards(empID) {
        const exists = await this.#doesExist("empID", "employee", +empID);
        if (!exists) return Format.error(Message.dataExistsError("empID"));

        const cardList = await this.#dLayer.getAllTimecards(empID);
        if (cardList.length === 0) return Format.error(Message.cardGetError(empID));

        return Format.success(cardList);
    }

    /**
     * Inserting a timecard.
     *
     * @param {object} card input object.
     * @returns new timecard as JSON.
     */
    async insertTimecard(card) {
        const { error } = Validate.isObjectValid("card", card);
        if (error) return Format.error(Message.joiError(error));

        const validate = await this.#alterCardHelper(card);
        if (validate) return validate;

        return Format.success(await this.#dLayer.insertTimecard(new Timecard(card)));
    }

    /**
     * Updating a timecard.
     *
     * @param {object} card input object.
     * @returns updated timecard as JSON.
     */
    async updateTimecard(card) {
        const parsedObject = JSON.parse(card);
        if (!parsedObject.cardID) return Format.error(Message.dataExistsError("cardID"));

        const validate = await this.#alterCardHelper(parsedObject);
        if (validate) return validate;

        return Format.success(await this.#dLayer.updateTimecard(new Timecard(parsedObject)));
    }

    /**
     * Alter timecard helper.
     *
     * @param {object} card input object.
     * @returns null || formatted message.
     */
    async #alterCardHelper(card) {
        let cardID, empID, startTime;
        for (const [key, input] of Object.entries(card)) {
            if (Validate.isStrEmpty(input)) {
                return Format.error(Message.emptyStrError(key));
            }

            if (key === "cardID") {
                const exists = await this.#doesExist(key, "timecard", input);
                if (!exists) return Format.error(Message.dataExistsError(key));

                cardID = input;
            } else if (key === "empID") {
                const exists = await this.#doesExist(key, "employee", input);
                if (!exists) return Format.error(Message.dataExistsError(key));

                empID = input;
            } else if (key === "startTime") {
                if (Validate.isWrongFormat("date", input, "ts")) {
                    return Format.error(Message.dataFormatError(key));
                }

                const values = [empID, Format.dateFormat("ts", input)];
                if (cardID) values.unshift(cardID);

                const isUnique = await this.#isTimeUnique(values);
                if (!isUnique) return Format.error(Message.dataValidError(key, "unique"));

                startTime = input;
            } else if (key === "endTime") {
                if (Validate.isWrongFormat("date", input, "ts")) {
                    return Format.error(Message.dataFormatError(key));
                } else if (!Validate.areTimesValid(startTime, input)) {
                    return Format.error(Message.dataValidError(`startTime|${key}`, "valid"));
                }
            }
        }
    }

    /**
     * Deleting a timecard.
     *
     * @param {number} cardID timecard id.
     * @returns number of affected rows.
     */
    async deleteTimecard(cardID) {
        const { affectedRows } = await this.#dLayer.deleteTimecard(cardID);
        if (affectedRows === 0) return Format.error(Message.dataExistsError("cardID"));

        return Format.success(Message.empAndCardDelSuccess("timecard", cardID));
    }

    // ***** VALIDATION ***** //

    /**
     * Helper for checking whether record exists.
     *
     * @param {string} column column name.
     * @param {string} table table name.
     * @param {any} value input value.
     * @returns true/false.
     */
    async #doesExist(column, table, value) {
        const data = await this.#dLayer.getDatabase().query(`SELECT ${column} FROM ${table};`);
        for (const object of data) {
            if (object[column] === value) {
                return true;
            }
        }

        return false;
    }

    /**
     * Helper for checking params are connected.
     *
     * @param {Array} cols column names.
     * @param {string} table table name.
     * @param {Array} values input values.
     * @returns true/false.
     */
    async #areBound(cols, table, values) {
        const data = await this.#dLayer.getDatabase().query(`
            SELECT ${cols[1]} FROM ${table} WHERE ${cols[0]} = ${values[0]};
        `);

        return data[0][cols[1]] === values[1];
    }

    /**
     * Helper for checking if number is unique.
     *
     * @param {Array} cols column names.
     * @param {string} table table name.
     * @param {string} values input values.
     * @returns true/value.
     */
    async #isNumUnique(cols, table, values) {
        const data = await this.#dLayer.getDatabase().query(`
            SELECT ${cols[0]}, ${cols[1]} FROM ${table};
        `);

        for (const object of data) {
            if (!isNaN(values[0])) {
                if (object[cols[0]] !== values[0]) {
                    if (object[cols[1]] === values[1]) {
                        return false;
                    }
                }
            } else if (object[cols[1]] === values[0]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Helper for checking if time is unique.
     *
     * @param {Array} values input values.
     * @returns true/value.
     */
    async #isTimeUnique(values) {
        const empID = values.length === 2 ? values[0] : values[1];
        const data = await this.#dLayer.getDatabase().query(`
                SELECT cardID, startTime FROM timecard WHERE empID = ${empID};
        `);

        for (const object of data) {
            if (values.length === 3) {
                if (object["cardID"] !== values[0]) {
                    if (Format.dateFormat("ts", object["startTime"]) === values[2]) {
                        return false;
                    }
                }
            } else if (Format.dateFormat("ts", object["startTime"]) === values[1]) {
                return false;
            }
        }

        return true;
    }
}

// Default export.
export default BusinessLayer;
