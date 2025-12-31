// Class
class Message {
    /**
     * Successful company deletion.
     *
     * @param {string} compName company name.
     * @returns formatted message.
     */
    static compDelSuccess(compName) {
        return `Company ${compName}'s information deleted.`;
    }

    /**
     * Formatting Joi errors.
     *
     * @param {object} object Joi error object.
     * @returns formatted message.
     */
    static joiError(object) {
        return `Value for ${object.details[0].message.replace(/"/g, "'")}.`;
    }

    /**
     * Department search result.
     *
     * @param {number} deptID department id.
     * @param {string} compName company name.
     * @param {string} msgType message type.
     * @returns formatted message.
     */
    static deptSearchResult(deptID, compName, msgType) {
        return `Department #${deptID}, from ${compName}, was ${msgType}.`;
    }

    /**
     * Unsuccessful employee fetch.
     *
     * @param {string} compName company name.
     * @returns formatted message.
     */
    static empGetError(compName) {
        return `No employees have been found for ${compName}.`;
    }

    /**
     * Successful item deletion.
     *
     * @param {string} table table name.
     * @param {number} id item id.
     * @returns formatted message.
     */
    static empAndCardDelSuccess(table, id) {
        return `Record for ${table} #${id} deleted.`;
    }

    /**
     * Unsuccessful employee fetch.
     *
     * @param {number} empID employee id.
     * @returns formatted message.
     */
    static cardGetError(empID) {
        return `No timecards have been found for the employee with the id #${empID}.`;
    }

    /**
     * Data is nonexistent to begin with.
     *
     * @param {string} column column name.
     * @returns formatted message.
     */
    static dataExistsError(column) {
        return `Value for '${column}' does not exist.`;
    }

    /**
     * Data is ether invalid, or is not unique.
     *
     * @param {string} column column name.
     * @param {string} errType error type.
     * @returns formatted message.
     */
    static dataValidError(column, errType) {
        return `Value for '${column}' is not ${errType}.`;
    }

    /**
     * Data is of the wrong format.
     *
     * @param {string} column column name.
     * @returns formatted message.
     */
    static dataFormatError(column) {
        return `Value for '${column}' is of the wrong format.`;
    }

    /**
     * Input string is empty.
     *
     * @param {string} column column name.
     * @returns formatted message.
     */
    static emptyStrError(column) {
        return `Value for '${column}' cannot be empty.`;
    }

    /**
     * Value is lower, or equal to zero.
     *
     * @param {string} column column name.
     * @returns formatted message.
     */
    static lowerThanZeroError(column) {
        return `Value for '${column}' cannot be lower, nor equal to zero.`;
    }
}

// Default export.
export default Message;
