import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import * as helper from "./helpers/test_helper";
import { IUser, User } from "../models";
import bcrypt from "bcrypt";

jest.setTimeout(30000);

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);

    const user = User.build({
      fullName: "root",
      password: passwordHash,
      about: "I am a programmer",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser: IUser = {
      fullName: "Matti Meikalainen",
      about: "I am a passenger",
      password: "abc123",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    };

    await api
      .post("/api/user")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.fullName);
    expect(usernames).toContain(newUser.fullName);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    console.log("users at start ", usersAtStart.length);

    const newUser: IUser = {
      fullName: "root",
      about: "Duplicate user",
      password: "abc123",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    };

    const result = await api
      .post("/api/user")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`fullName` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
}, 10000);
