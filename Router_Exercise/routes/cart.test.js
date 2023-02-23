process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let apple = { name: "apple", price: 1 };

beforeEach(function () {
    items.push(apple);
});

afterEach(function () {
    items.length = 0;
});


describe("GET /items", () => {
    test("Gets a list of items", async () => {
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ items: [apple] });
    });
});

describe("POST /items", () => {
    test("Creates a new item", async () => {
        const resp = await request(app)
        .post(`/items`)
        .send({
            name: "pear",
            price: 2,
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ added: { name: "pear", price: 2 } });
    });
    test('responds with 400 if name is missing', async function () {
        const resp = await request(app)
        .post(`/items`)
        .send({});
        expect(resp.statusCode).toBe(400);
    });
});

describe("GET /items/:name", () => {
    test("Gets a single item", async () => {
        const resp = await request(app).get(`/items/${apple.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ item: apple });
    });
    test("Responds with 404 if can't find item", async () => {
        const resp = await request(app).get(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("PATCH /items/:name", () => {
    test("Updates a single item", async () => {
        const resp = await request(app)
        .patch(`/items/${apple.name}`)
        .send({
            name: "pear",
            price: 2,
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ updated: { name: "pear", price: 2 } });
    });
    test("Responds with 404 if can't find item", async () => {
        const resp = await request(app)
        .patch(`/items/0`)
        .send({
            name: "pear",
            price: 2,
        });
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items", () => {
    test("Deletes a single item", async () => {
        const resp = await request(app).delete(`/items/${apple.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
    test("Responds with 404 if can't find item", async () => {
        const resp = await request(app).delete(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});