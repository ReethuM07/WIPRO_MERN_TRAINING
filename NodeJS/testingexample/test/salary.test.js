const assert = require("assert");

describe("Salary Unit Test", () => {

  it("should calculate bonus correctly", () => {
    const calculateBonus = salary => salary * 0.10;
    assert.equal(5000, calculateBonus(50000));
  });

  it("should calculate tax correctly", () => {
    const calculateTax = salary => salary * 0.20;
    assert.equal(10000, calculateTax(50000));
  });

  it("should calculate leave deduction correctly", () => {
    const calculateLeaveDeduction = (salary, leaveDays) => {
      const perDaySalary = salary / 30;
      return perDaySalary * leaveDays;
    };
    assert.equal(2000, calculateLeaveDeduction(30000, 2));
  });

});
