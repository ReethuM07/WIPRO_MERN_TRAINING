import { expect } from "chai";
import { getCourses, createCourse } from "../controllers/courseController.js";

describe("Course Controller Unit Tests", () => {

  describe("getCourses()", () => {
    it("should return all courses", () => {
      const req = {};
      const res = {
        status: function(code) {
          expect(code).to.equal(200);
          return this;
        },
        json: function(data) {
          expect(data).to.be.an("array");
        }
      };

      getCourses(req, res);
    });
  });

  describe("createCourse()", () => {

    it("should return 400 if title missing", () => {
      const req = { body: {} };

      const res = {
        status: function(code) {
          expect(code).to.equal(400);
          return this;
        },
        json: function(data) {
          expect(data.message).to.equal("Title is required");
        }
      };

      createCourse(req, res);
    });

    it("should create course if title provided", () => {
      const req = { body: { title: "AI Course" } };

      const res = {
        status: function(code) {
          expect(code).to.equal(201);
          return this;
        },
        json: function(data) {
          expect(data.title).to.equal("AI Course");
        }
      };

      createCourse(req, res);
    });

  });

});
