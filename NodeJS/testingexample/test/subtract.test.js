const {expect} = require("chai");
const assert = require('assert');

describe("Subtract Unit Test", ()=>{
    it("should subtract numbers correctly",()=>{
        const sum = (a,b) => a-b;
        // expect(sum(2,3).to.equal(5));
        assert.equal(1, sum(3,2));
    })
})