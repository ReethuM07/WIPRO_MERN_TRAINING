const assert = require('assert');

describe("Sum Unit Test", ()=>{
    it("should add numbers correctly",()=>{
        const sum = (a,b) => a+b;
        //expect(sum(2,3).to.equals(5));
        assert.equal(5, sum(2,3));
    })
})