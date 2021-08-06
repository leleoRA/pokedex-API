import supertest from "supertest";

import app, { init } from "../../src/app";
import { getConnection } from "typeorm";

afterAll(async () => {
  await getConnection().close();
});

beforeAll(async () => {
  await init();
});

describe("POST /sign-up", () => {
  it("should answer with status 201", async () => {
    const signUpBody = {
      email: "teste@teste.com",
      password: "1234",
      confirmPassword: "1234"
    }

    const response = await supertest(app).post("/sign-up").send(signUpBody);

    expect(response.status).toBe(201);
  });

  it("should answer with status 409 for email already in use", async () => {
    const signUpBody = {
      email: "teste@teste.com",
      password: "1234",
      confirmPassword: "1234"
    }

    await supertest(app).post("/sign-up").send(signUpBody);
    const response = await supertest(app).post("/sign-up").send(signUpBody);

    expect(response.status).toBe(409);
  });

  it("should answer with status 400 for differents passwords", async () => {
    const wrongSignUpBody = {
      email: "teste@teste.com",
      password: "1234",
      confirmPassword: "123"
    }

    const response = await supertest(app).post("/sign-up").send(wrongSignUpBody);

    expect(response.status).toBe(400);
  });

  it("should answer with status 400 for invalid email", async () => {
    const wrongEmailSignUpBody = {
      email: "teste",
      password: "1234",
      confirmPassword: "123"
    }

    const response = await supertest(app).post("/sign-up").send(wrongEmailSignUpBody);

    expect(response.status).toBe(400);
  });
});
