const request = require("supertest");
const app = require("../server");
const { expect } = require("chai");

describe("User Routing", () => {

  it("GET /users should return array", async () => {
    const res = await request(app).get("/users");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("POST /users without token should return 401", async () => {
    const res = await request(app).post("/users");

    expect(res.status).to.equal(401);
  });

});
