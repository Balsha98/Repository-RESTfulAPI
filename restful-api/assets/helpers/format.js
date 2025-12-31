// Class
class Format {
    /**
     * Formatting success messages.
     *
     * @param {object} object input object.
     * @returns formatted success message.
     */
    static success(object) {
        return { success: object };
    }

    /**
     * Formatting error messages.
     *
     * @param {object} object input object.
     * @returns formatted error message.
     */
    static error(message) {
        return { error: message };
    }

    /**
     * Fetching the date.
     *
     * @param {string} type input type.
     * @param {string} time input time.
     * @returns formatted date.
     */
    static dateFormat(type, time) {
        return String(time).split(type === "dt" ? "T" : " ")[0];
    }
}

// Default export.
module.exports = Format;
