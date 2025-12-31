// Imported modules.
const BusinessLayer = require("./businessLayer");

// Class
class ServiceLayer {
    #bLayer;

    /**
     * Default constructor.
     */
    constructor() {
        this.#bLayer = new BusinessLayer();
    }

    // ***** COMPANY ***** //

    /**
     * Deleting a company.
     *
     * @param {string} compName company name.
     * @returns formatted message.
     */
    async deleteCompany(compName) {
        return await this.#bLayer.deleteCompany(compName);
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
        return await this.#bLayer.getDepartment(deptID, compName);
    }

    /**
     * Getting all departments.
     *
     * @param {string} compName company name.
     * @returns departments list as JSON.
     */
    async getAllDepartments(compName) {
        return await this.#bLayer.getAllDepartments(compName);
    }

    /**
     * Inserting a department.
     *
     * @param {object} dept input object.
     * @returns new department as JSON.
     */
    async insertDepartment(dept) {
        return await this.#bLayer.insertDepartment(dept);
    }

    /**
     * Updating a department.
     *
     * @param {object} dept input object.
     * @returns updated department as JSON.
     */
    async updateDepartment(dept) {
        return await this.#bLayer.updateDepartment(dept);
    }

    /**
     * Deleting a department.
     *
     * @param {number} deptID department id.
     * @param {string} compName company name.
     * @returns number of affected rows.
     */
    async deleteDepartment(deptID, compName) {
        return await this.#bLayer.deleteDepartment(deptID, compName);
    }

    // ***** EMPLOYEE ***** //

    /**
     * Getting an employee.
     *
     * @param {number} empID employee id.
     * @returns employee as JSON.
     */
    async getEmployee(empID) {
        return await this.#bLayer.getEmployee(empID);
    }

    /**
     * Getting all employees.
     *
     * @param {string} compName company name.
     * @returns employees list as JSON.
     */
    async getAllEmployees(compName) {
        return await this.#bLayer.getAllEmployees(compName);
    }

    /**
     * Inserting an employee.
     *
     * @param {object} emp input object.
     * @returns new employee as JSON.
     */
    async insertEmployee(emp) {
        return await this.#bLayer.insertEmployee(emp);
    }

    /**
     * Updating an employee.
     *
     * @param {object} emp input object.
     * @returns updated employee as JSON.
     */
    async updateEmployee(emp) {
        return await this.#bLayer.updateEmployee(emp);
    }

    /**
     * Deleting an employee.
     *
     * @param {number} empID employee id.
     * @returns number of affected rows.
     */
    async deleteEmployee(empID) {
        return await this.#bLayer.deleteEmployee(empID);
    }

    // ***** TIMECARD ***** //

    /**
     * Getting a timecard.
     *
     * @param {number} cardID timecard id.
     * @returns timecard as JSON.
     */
    async getTimecard(cardID) {
        return await this.#bLayer.getTimecard(cardID);
    }

    /**
     * Getting all timecards.
     *
     * @param {number} empID employee id.
     * @returns timecards list as JSON.
     */
    async getAllTimecards(empID) {
        return await this.#bLayer.getAllTimecards(empID);
    }

    /**
     * Inserting a timecard.
     *
     * @param {object} card input object.
     * @returns new timecard as JSON.
     */
    async insertTimecard(card) {
        return await this.#bLayer.insertTimecard(card);
    }

    /**
     * Updating a timecard.
     *
     * @param {object} card input object.
     * @returns updated timecard as JSON.
     */
    async updateTimecard(card) {
        return await this.#bLayer.updateTimecard(card);
    }

    /**
     * Deleting a timecard.
     *
     * @param {number} cardID timecard id.
     * @returns number of affected rows.
     */
    async deleteTimecard(cardID) {
        return await this.#bLayer.deleteTimecard(cardID);
    }
}

// Default export.
module.exports = ServiceLayer;
