import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("User API Integration Tests", () => {

  describe("POST /api/users/register", () => {

    it("should return 400 if email missing", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send({ name: "Jaya" });

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("Email required");
    });

    it("should register new user", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send({ name: "Jaya", email: "jaya@gmail.com" });

      expect(res.status).to.equal(201);
      expect(res.body.email).to.equal("jaya@gmail.com");
    });

  });

  describe("GET /api/users", () => {

    it("should return list of users", async () => {
      const res = await request(app)
        .get("/api/users");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });

  });

});
