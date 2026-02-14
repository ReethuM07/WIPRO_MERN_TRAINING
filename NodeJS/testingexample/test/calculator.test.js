const assert = require("assert");

describe("Calculator Unit Test", () => {

  it("should add two numbers correctly", () => {
    const add = (a, b) => a + b;
    assert.equal(5, add(2, 3));
  });

  it("should subtract two numbers correctly", () => {
    const subtract = (a, b) => a - b;
    assert.equal(2, subtract(5, 3));
  });

  it("should multiply two numbers correctly", () => {
    const multiply = (a, b) => a * b;
    assert.equal(8, multiply(2, 4));
  });

});
