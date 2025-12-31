// Class
class Timecard {
    #cardID;
    #empID;
    #startTime;
    #endTime;
    #attrList;
    #attrData;

    /**
     * Constructor
     *
     * @param {object} object input object.
     */
    constructor(object) {
        this.#attrList = [];
        this.#attrData = [];
        this.#parseObject(object);
    }

    /**
     * Object parser.
     *
     * @param {object} object input object.
     */
    #parseObject(object) {
        for (const [key, input] of Object.entries(object)) {
            if (key === "cardID") {
                this.setCardID(input);
            } else {
                this.#addAttr(key);
                this.#addData(input);
                if (key === "empID") {
                    this.setEmpID(input);
                } else if (key === "startTime") {
                    this.setStartTime(input);
                } else if (key === "endTime") {
                    this.setEndTime(input);
                }
            }
        }
    }

    // Getters
    getCardID() {
        return this.#cardID;
    }

    getEmpID() {
        return this.#empID;
    }

    getStartTime() {
        return this.#startTime;
    }

    getEndTime() {
        return this.#endTime;
    }

    getAttrList() {
        return this.#attrList;
    }

    getAttrData() {
        return this.#attrData;
    }

    // Setters
    setCardID(cardID) {
        this.#cardID = cardID;
    }

    setEmpID(empID) {
        this.#empID = empID;
    }

    setStartTime(startTime) {
        this.#startTime = startTime;
    }

    setEndTime(endTime) {
        this.#endTime = endTime;
    }

    #addAttr(newAttr) {
        this.#attrList.push(newAttr);
    }

    #addData(data) {
        this.#attrData.push(data);
    }

    // toString
    toString() {
        return JSON.stringify(
            {
                timecard: {
                    cardID: this.getCardID(),
                    empID: this.getEmpID(),
                    startTime: this.getStartTime(),
                    endTime: this.getEndTime(),
                },
            },
            null,
            4
        );
    }
}

// Default export.
module.exports = Timecard;
