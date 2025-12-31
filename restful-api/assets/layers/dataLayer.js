"use strict";

// Imported modules.
const Database = require("../database/database");
const Department = require("../models/department");
const Employee = require("../models/employee");
const Timecard = require("../models/timecard");

// Class
class DataLayer {
    #database;
    #sqlQuery;
    #deptList;
    #empList;
    #cardList;

    /**
     * Default constructor.
     */
    constructor() {
        this.#database = new Database();
        this.#deptList = [];
        this.#empList = [];
        this.#cardList = [];
    }

    /**
     * Getter for database.
     *
     * @returns database object.
     */
    getDatabase() {
        return this.#database;
    }

    // ***** COMPANY ***** //

    /**
     * Deleting a company.
     *
     * @param {string} compName company name.
     * @returns number of affected rows.
     */
    async deleteCompany(compName) {
        this.#sqlQuery = `DELETE FROM department WHERE compName = "${compName}";`;
        const { affectedRows } = await this.#database.query(this.#sqlQuery);

        // Update employees' deptID.
        this.#deptList = await this.getAllDepartments(compName);
        for (const { department } of this.#deptList) {
            this.#updateEmpDeptID(department["deptID"]);
        }

        return affectedRows;
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
        this.#sqlQuery = `SELECT * FROM department WHERE deptID = ${deptID} AND compName = "${compName}";`;
        const [dept] = await this.#database.query(this.#sqlQuery);
        return JSON.parse(new Department(dept));
    }

    /**
     * Getting all department.
     *
     * @param {string} compName company name.
     * @returns departments list as JSON.
     */
    async getAllDepartments(compName) {
        this.#deptList.splice(0);

        this.#sqlQuery = `SELECT * FROM department WHERE compName = '${compName}';`;
        const deptList = await this.#database.query(this.#sqlQuery);
        for (const dept of deptList) {
            this.#deptList.push(JSON.parse(new Department(dept)));
        }

        return this.#deptList;
    }

    /**
     * Inserting a department.
     *
     * @param {Department} dept department object.
     * @returns new department as JSON.
     */
    async insertDepartment(dept) {
        this.#sqlQuery = this.#genInsertQuery("department", dept.getAttrList());

        await this.#database.query(this.#sqlQuery, dept.getAttrData());
        const [{ deptID }] = await this.#database.query(
            `SELECT deptID FROM department WHERE deptNum = "${dept.getDeptNum()}";`
        );

        dept.setDeptID(deptID);
        return JSON.parse(dept);
    }

    /**
     * Updating a department.
     *
     * @param {Department} dept department object.
     * @returns updated department as JSON.
     */
    async updateDepartment(dept) {
        this.#sqlQuery = this.#genUpdateQuery("department", "deptID", dept.getDeptID(), dept.getAttrList());
        await this.#database.query(this.#sqlQuery, dept.getAttrData());
        return await this.getDepartment(dept.getDeptID(), dept.getCompName());
    }

    /**
     * Deleting a department.
     *
     * @param {number} deptID department id.
     * @param {string} compName company name.
     * @returns number of affected rows.
     */
    async deleteDepartment(deptID, compName) {
        const { affectedRows } = await this.#database.query(
            `DELETE FROM department WHERE deptID = ${deptID} AND compName = "${compName}";`
        );

        // Update employees' deptID.
        if (affectedRows !== 0) this.#updateEmpDeptID(deptID);

        return affectedRows;
    }

    // ***** EMPLOYEE ***** //

    /**
     * Getting an employee.
     *
     * @param {number} empID employee id.
     * @returns employee as JSON.
     */
    async getEmployee(empID) {
        this.#sqlQuery = `SELECT * FROM employee WHERE empID = ${empID};`;
        const [emp] = await this.#database.query(this.#sqlQuery);
        return JSON.parse(new Employee(emp));
    }

    /**
     * Getting all employees.
     *
     * @param {string} compName company name.
     * @returns employees list as JSON.
     */
    async getAllEmployees(compName) {
        this.#empList.splice(0);

        this.#deptList = await this.getAllDepartments(compName);
        for (const { department } of this.#deptList) {
            const empList = await this.#database.query(
                `SELECT * FROM employee WHERE deptID = ${department["deptID"]};`
            );

            for (const emp of empList) {
                this.#empList.push(JSON.parse(new Employee(emp)));
            }
        }

        return this.#empList;
    }

    /**
     * Inserting an employee.
     *
     * @param {Employee} emp employee object.
     * @returns new employee as JSON.
     */
    async insertEmployee(emp) {
        this.#sqlQuery = this.#genInsertQuery("employee", emp.getAttrList());

        await this.#database.query(this.#sqlQuery, emp.getAttrData());
        const [{ empID }] = await this.#database.query(
            `SELECT empID FROM employee WHERE empNum = "${emp.getEmpNum()}";`
        );

        emp.setEmpID(empID);
        return JSON.parse(emp);
    }

    /**
     * Updating an employee.
     *
     * @param {Employee} emp employee object.
     * @returns updated employee as JSON.
     */
    async updateEmployee(emp) {
        this.#sqlQuery = this.#genUpdateQuery("employee", "empID", emp.getEmpID(), emp.getAttrList());
        await this.#database.query(this.#sqlQuery, emp.getAttrData());
        return await this.getEmployee(emp.getEmpID());
    }

    /**
     * Deleting an employee.
     *
     * @param {number} empID employee id.
     * @returns number of affected rows.
     */
    async deleteEmployee(empID) {
        return await this.#database.query(`DELETE FROM employee WHERE empID = ${empID};`);
    }

    // ***** TIMECARD ***** //

    /**
     * Getting a timecard.
     *
     * @param {number} cardID timecard id.
     * @returns timecard as JSON.
     */
    async getTimecard(cardID) {
        this.#sqlQuery = `SELECT * FROM timecard WHERE cardID = ${cardID};`;
        const [card] = await this.#database.query(this.#sqlQuery);
        return JSON.parse(new Timecard(card));
    }

    /**
     * Getting all timecards.
     *
     * @param {number} empID employee id.
     * @returns timecards list as JSON.
     */
    async getAllTimecards(empID) {
        this.#cardList.splice(0);

        this.#sqlQuery = `SELECT * FROM timecard WHERE empID = ${empID};`;
        const cardList = await this.#database.query(this.#sqlQuery);
        for (const card of cardList) {
            this.#cardList.push(JSON.parse(new Timecard(card)));
        }

        return this.#cardList;
    }

    /**
     * Inserting a timecard.
     *
     * @param {Timecard} card timecard object.
     * @returns new timecard as JSON.
     */
    async insertTimecard(card) {
        this.#sqlQuery = this.#genInsertQuery("timecard", card.getAttrList());

        await this.#database.query(this.#sqlQuery, card.getAttrData());
        const [{ cardID }] = await this.#database.query(
            `SELECT cardID FROM timecard WHERE empID = ${card.getEmpID()} AND startTime = "${card.getStartTime()}";`
        );

        card.setCardID(cardID);
        return JSON.parse(card);
    }

    /**
     * Updating a timecard.
     *
     * @param {Timecard} card timecard object.
     * @returns updated timecard as JSON.
     */
    async updateTimecard(card) {
        this.#sqlQuery = this.#genUpdateQuery("timecard", "cardID", card.getCardID(), card.getAttrList());
        await this.#database.query(this.#sqlQuery, card.getAttrData());
        return await this.getTimecard(card.getCardID());
    }

    /**
     * Deleting a timecard.
     *
     * @param {number} cardID timecard id.
     * @returns number of affected rows.
     */
    async deleteTimecard(cardID) {
        return await this.#database.query(`DELETE FROM timecard WHERE cardID = ${cardID};`);
    }

    // ***** HELPERS ***** //

    /**
     * Insert query generator.
     *
     * @param {string} table table name.
     * @param {Array} attrList attributes list.
     * @returns formatted insert query.
     */
    #genInsertQuery(table, attrList) {
        let inQuery = `INSERT INTO ${table} (`;
        let inValues = "VALUES (";

        for (const attr of attrList) {
            inQuery += `${attr}, `;
            inValues += `?, `;
        }

        inQuery = inQuery.substring(0, inQuery.length - 2) + ") ";
        inValues = inValues.substring(0, inValues.length - 2) + ");";

        return inQuery + inValues;
    }

    /**
     * Update query generator.
     *
     * @param {string} table table name.
     * @param {string} column column name.
     * @param {number} id item id.
     * @param {Array} attrList attributes list.
     * @returns formatted update query.
     */
    #genUpdateQuery(table, column, id, attrList) {
        let upQuery = `UPDATE ${table} SET `;
        for (const attr of attrList) {
            upQuery += `${attr} = ?, `;
        }

        upQuery = upQuery.substring(0, upQuery.length - 2);
        return (upQuery += ` WHERE ${column} = ${id};`);
    }

    /**
     * Employees' deptID update helper.
     *
     * @param {number} deptID department id.
     */
    #updateEmpDeptID(deptID) {
        this.#database.query("UPDATE employee SET deptID = 0 WHERE deptID = ?;", [deptID]);
    }
}

// Default export.
export default DataLayer;
