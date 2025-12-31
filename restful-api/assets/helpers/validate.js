"use strict";

// Imported modules.
const Joi = require("joi");
const Format = require("./format");

// Class
class Validate {
    // String formats.
    static #STR_FMT = {
        ltr: /[^a-zA-Z ]/g,
        num: /[^0-9]/g,
        all: /[^a-zA-Z0-9 ]/g,
    };

    // Date formats.
    static #DT_FMT = {
        dt: /\d{4}-\d{2}-\d{2}/g,
        ts: /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g,
    };

    // Time differences.
    static #DIFF = {
        dDiff: 60 * 60 * 24 * 1000,
        hDiff: 60 * 60 * 1000,
        hrMax: 12,
        hrMin: 1,
        wk: 7,
    };

    /**
     * Checks if string is empty.
     *
     * @param {string} str input string.
     * @returns true/false.
     */
    static isStrEmpty(str) {
        return String(str).trim() === "";
    }

    /**
     * Checks if number is positive.
     *
     * @param {number} num input number.
     * @returns true/false.
     */
    static isPositive(num) {
        return num > 0;
    }

    /**
     * Checks the input's format.
     *
     * @param {string} type type of input.
     * @param {any} value passed input.
     * @param {string} expected expected format.
     * @returns true/false.
     */
    static isWrongFormat(type, value, expected) {
        if (type === "str") {
            return String(value).match(Validate.#STR_FMT[expected]);
        }

        // In case "date" is passed as type.
        return !String(value).match(Validate.#DT_FMT[expected]);
    }

    /**
     * Uses Joi to check object format.
     *
     * @param {string} expObj expected object.
     * @param {object} object input object.
     * @returns true/false.
     */
    static isObjectValid(expObj, object) {
        let expected = {};
        switch (expObj) {
            case "dept":
                expected = {
                    compName: Joi.string().max(25).required(),
                    deptName: Joi.string().max(255).required(),
                    deptNum: Joi.string().max(20).required(),
                    deptLoc: Joi.string().max(255).required(),
                };
                break;
            case "emp":
                expected = {
                    deptID: Joi.number().required(),
                    empName: Joi.string().max(50).required(),
                    empNum: Joi.string().max(20).required(),
                    hireDate: Joi.string().max(10).required(),
                    jobPos: Joi.string().max(30).required(),
                    salary: Joi.number().required(),
                    mngID: Joi.number().required(),
                };
                break;
            default:
                expected = {
                    empID: Joi.number().required(),
                    startTime: Joi.string().max(19).required(),
                    endTime: Joi.string().max(19).required(),
                };
        }

        return Joi.validate(object, expected);
    }

    /**
     * Checks if date is valid.
     *
     * @param {string} date input date.
     * @returns true/false.
     */
    static isDateValid(date) {
        const todaysDate = new Date();
        const currDateObj = new Date(date);
        if (date === Format.dateFormat("dt", todaysDate) || currDateObj.getTime() < todaysDate.getTime()) {
            return currDateObj.getDay() > 0 && currDateObj.getDay() < 6;
        }
    }

    /**
     * Checks if times are valid.
     *
     * @param {string} sTime start time.
     * @param {string} eTime end time.
     * @returns true/false.
     */
    static areTimesValid(sTime, eTime) {
        const todaysTime = Date.now();
        const startTime = new Date(sTime);
        if (startTime.getTime() <= todaysTime) {
            let timeDiff = todaysTime - startTime.getTime();
            if (timeDiff / Validate.#DIFF["dDiff"] <= Validate.#DIFF["wk"]) {
                timeDiff = (new Date(eTime).getTime() - startTime.getTime()) / Validate.#DIFF["hDiff"];
                if (timeDiff >= Validate.#DIFF["hrMin"] && timeDiff <= Validate.#DIFF["hrMax"]) {
                    return this.#isDayValid(sTime) && this.#isDayValid(eTime);
                }
            }
        }

        return false;
    }

    /**
     * Checks if day is valid.
     *
     * @param {string} time input time.
     * @returns true/false.
     */
    static #isDayValid(time) {
        const dateObj = new Date(time);
        if (dateObj.getDay() > 0 && dateObj.getDay() < 6) {
            if (dateObj.getHours() === 18) {
                return dateObj.getMinutes() === 0 && dateObj.getSeconds() === 0;
            }

            return dateObj.getHours() >= 6 && dateObj.getHours() <= 18;
        }

        return false;
    }
}

// Default export.
module.exports = Validate;
