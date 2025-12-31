// Class
class Department {
    #deptID;
    #compName;
    #deptName;
    #deptNum;
    #deptLoc;
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
            if (key === "deptID") {
                this.setDeptID(input);
            } else {
                this.#addAttr(key);
                this.#addData(input);
                if (key === "compName") {
                    this.setCompName(input);
                } else if (key === "deptName") {
                    this.setDeptName(input);
                } else if (key === "deptNum") {
                    this.setDeptNum(input);
                } else {
                    this.setDeptLoc(input);
                }
            }
        }
    }

    // Getters
    getDeptID() {
        return this.#deptID;
    }

    getCompName() {
        return this.#compName;
    }

    getDeptName() {
        return this.#deptName;
    }

    getDeptNum() {
        return this.#deptNum;
    }

    getDeptLoc() {
        return this.#deptLoc;
    }

    getAttrList() {
        return this.#attrList;
    }

    getAttrData() {
        return this.#attrData;
    }

    // Setters
    setDeptID(deptID) {
        this.#deptID = deptID;
    }

    setCompName(compName) {
        this.#compName = compName;
    }

    setDeptName(deptName) {
        this.#deptName = deptName;
    }

    setDeptNum(deptNum) {
        this.#deptNum = deptNum;
    }

    setDeptLoc(deptLoc) {
        this.#deptLoc = deptLoc;
    }

    #addAttr(attr) {
        this.#attrList.push(attr);
    }

    #addData(data) {
        this.#attrData.push(data);
    }

    // toString
    toString() {
        return JSON.stringify(
            {
                department: {
                    deptID: this.getDeptID(),
                    compName: this.getCompName(),
                    deptName: this.getDeptName(),
                    deptNum: this.getDeptNum(),
                    deptLoc: this.getDeptLoc(),
                },
            },
            null,
            4
        );
    }
}

// Default export.
export default Department;
