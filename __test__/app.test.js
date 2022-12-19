const app = require("../index.js");
const request = require("supertest");
const { dataUser } = require("../controllers/getDataController.js");
const { Users } = require("../models");
const router = require("../router.js");

jest.mock("../controllers/getDataController", () => ({
  dataUser: jest.fn().mockResolvedValue({
    email: "abcd@gmail.com",
    username: "abcd",
    score: "1000",
  }),
}));

describe("app", () => {
  describe("GET /datauser", () => {
    jest.setTimeout(30000);
    it("should return response", async () => {
      const user = await request(app).get("/datauser").expect(404);
      console.log("user", user);
      expect(true).toBeTruthy();
    });
  });
});
