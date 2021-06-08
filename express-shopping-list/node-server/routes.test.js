process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const router = require("./routes");
const fs = require("fs");
const cors = require("cors");

describe("/items routes", () => {
  test("POST new item", async () => {
    const res = await request(app).post("/items").query({ hat: "1.50" });
    expect(res.body).not.toBeNull();
  });

  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.body.body[0].name).toEqual("big hat");
    expect(res.statusCode).toBe(200);
  });

  test("Get specific item", async () => {
    const res = await request(app).get("/items/hat");
    expect(res.statusCode).toBe(200);
  });

  test("Delete item", async () => {
    const res = await request(app).delete("/items/hat");
    expect(res.statusCode).toBe(200);
  });
});
