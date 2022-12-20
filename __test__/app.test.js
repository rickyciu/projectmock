const app = require("../index.js");
const request = require("supertest");
const { dataUser } = require("../controllers/getDataController.js");
const { Users } = require("../models");
const router = require("../router.js");

// jest.mock("../controllers/getDataController", () => ({
//   dataUser: jest.fn().mockResolvedValue({
//     email: "abcd@gmail.com",
//     username: "abcd",
//     score: "1000",
//   }),
// }));

jest.mock('../models')
jest.mock('sequelize')
jest.mock('cloudinary')
// jest.mock('../controllers/getDataController')

describe("app", () => {
  describe("GET /datauser", () => {
    // jest.setTimeout(30000);
    it("should return response", async () => {
      // Users.findAll.mockResolvedValue(() => ({
      //   data: 'data'
      // }))
      const user = await request(app).get("/datauser");
      console.log("user", user.body);
      expect(user.body.data).toEqual('data')
    });
  });
});
