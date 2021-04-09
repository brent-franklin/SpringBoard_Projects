process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const server = require("./server");

afterAll((done) => {
  server.close();
  done();
});

describe("GET", () => {
  it("Get all customers", async (done) => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("<title>Lunch.ly Customers</title>");
    done();
  });
});

describe("GET", () => {
  it("Search for one customer by name - case insensitive", async (done) => {
    const res = await request(app).get("/search/").query({ name: "edward" });
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("<title>Lunch.ly Customers</title>");
    expect(res.text).toContain("Edward");
    done();
  });

  it("404 Error for non-existant customer", async (done) => {
    const res = await request(app)
      .get("/search/")
      .query({ name: "non-customer" });
    expect(res.statusCode).toBe(404);
    expect(res.text).toContain("No customer found with that name");
    done();
  });
});

describe("GET", () => {
  it("Get the 10 most valued customers", async (done) => {
    const res = await request(app).get("/valued/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("<title>Lunch.ly Customers</title>");
    expect(res.text.match(/<li class="mb-4">/g).length).toBe(10);
    done();
  });
});
