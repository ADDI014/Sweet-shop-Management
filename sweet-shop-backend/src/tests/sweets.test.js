const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const User = require("../models/User");
const Sweet = require("../models/Sweet");

let mongoServer;
let adminToken;
let userToken;
let sweetId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
  });

  await User.updateOne(
    { email: "admin@test.com" },
    { role: "admin" }
  );

  const adminRes = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "123456",
  });

  adminToken = adminRes.body.token;

  await request(app).post("/api/auth/register").send({
    name: "User",
    email: "user@test.com",
    password: "123456",
  });

  const userRes = await request(app).post("/api/auth/login").send({
    email: "user@test.com",
    password: "123456",
  });

  userToken = userRes.body.token;
});

afterEach(async () => {
  await Sweet.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Sweet API (Admin + User)", () => {
  it("admin should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 5,
        image: "test-image-url",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Ladoo");

    sweetId = res.body._id;
  });

  it("user should get all sweets", async () => {
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Jalebi",
        category: "Indian",
        price: 15,
        quantity: 3,
        image: "test-image-url",
      });

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("user should search sweets by name", async () => {
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 20,
        quantity: 2,
        image: "test-image-url",
      });

    const res = await request(app)
      .get("/api/sweets/search?name=Barfi")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.some(s => s.name === "Barfi")).toBe(true);
  });

  it("user should purchase a sweet", async () => {
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Peda",
        category: "Indian",
        price: 12,
        quantity: 2,
        image: "test-image-url",
      });

    const id = createRes.body._id;

    const res = await request(app)
      .post(`/api/sweets/${id}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(1);
  });

  it("admin should restock a sweet", async () => {
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Rasgulla",
        category: "Indian",
        price: 18,
        quantity: 2,
        image: "test-image-url",
      });

    const id = createRes.body._id;

    const res = await request(app)
      .post(`/api/sweets/${id}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(7);
  });

  it("admin should delete a sweet", async () => {
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Halwa",
        category: "Indian",
        price: 25,
        quantity: 4,
        image: "test-image-url",
      });

    const id = createRes.body._id;

    const res = await request(app)
      .delete(`/api/sweets/${id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});
