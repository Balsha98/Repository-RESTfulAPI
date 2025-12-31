// Class
class Employee {
    #empID;
    #deptID;
    #empName;
    #empNum;
    #hireDate;
    #jobPos;
    #salary;
    #mngID;
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
            if (key === "empID") {
                this.setEmpID(input);
            } else {
                this.#addAttr(key);
                this.#addData(input);
                if (key === "deptID") {
                    this.setDeptID(input);
                } else if (key === "empName") {
                    this.setEmpName(input);
                } else if (key === "empNum") {
                    this.setEmpNum(input);
                } else if (key === "hireDate") {
                    this.setHireDate(input);
                } else if (key === "jobPos") {
                    this.setJobPos(input);
                } else if (key === "salary") {
                    this.setSalary(input);
                } else if (key === "mngID") {
                    this.setMngID(input);
                }
            }
        }
    }

    // Getters
    getEmpID() {
        return this.#empID;
    }

    getDeptID() {
        return this.#deptID;
    }

    getEmpName() {
        return this.#empName;
    }

    getEmpNum() {
        return this.#empNum;
    }

    getHireDate() {
        return this.#hireDate;
    }

    getJobPos() {
        return this.#jobPos;
    }

    getSalary() {
        return this.#salary;
    }

    getMngID() {
        return this.#mngID;
    }

    getAttrList() {
        return this.#attrList;
    }

    getAttrData() {
        return this.#attrData;
    }

    // Setters
    setEmpID(empID) {
        this.#empID = empID;
    }

    setDeptID(deptID) {
        this.#deptID = deptID;
    }

    setEmpName(empName) {
        this.#empName = empName;
    }

    setEmpNum(empNum) {
        this.#empNum = empNum;
    }

    setHireDate(hireDate) {
        this.#hireDate = hireDate;
    }

    setJobPos(jobPos) {
        this.#jobPos = jobPos;
    }

    setSalary(salary) {
        this.#salary = salary;
    }

    setMngID(mngID) {
        this.#mngID = mngID;
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
                employee: {
                    empID: this.getEmpID(),
                    deptID: this.getDeptID(),
                    empName: this.getEmpName(),
                    empNum: this.getEmpNum(),
                    hireDate: this.getHireDate(),
                    jobPos: this.getJobPos(),
                    salary: this.getSalary(),
                    mngID: this.getMngID(),
                },
            },
            null,
            4
        );
    }
}

// Default export.
module.exports = Employee;
