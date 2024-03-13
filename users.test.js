const request = require("supertest");

const baseUrl = "https://gorest.co.in";
const usersUrl = "/public/v2/users";
let userId;
let userUrl;
const token =
  "e3c7600c3a84e69a9b1366a55eaec6e74f45af992568ee8f575e0f25d2c7d3a2";
let apiRequest = request(baseUrl);
let user = {
  name: "Leela Turanga",
  gender: "female",
  email: "leelat@planetexpress.com",
  status: "active",
};

let commonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
};

async function validateUser() {
  return await apiRequest
    .get(userUrl)
    .set(commonHeaders)
    .expect(200, user)
    .expect("Content-Type", /json/);
}

describe("Test /Users API", () => {
  it("Created new user successfully", async () => {
    const response = await apiRequest
      .post(usersUrl)
      .set(commonHeaders)
      .send(user)
      .expect(201)
      .expect("Content-Type", /json/);

    userId = response.body.id;
    user.id = userId;
    expect(response.body).toEqual(user);

    userUrl = usersUrl + "/" + userId;
    expect(response.headers["location"]).toEqual(baseUrl + userUrl);
  });

  it("Got new user details successfully", async () => {
    await validateUser();
  });

  it("Failed to Create new user with existing email", async () => {
    const response = await apiRequest
      .post(usersUrl)
      .set(commonHeaders)
      .send(user)
      .expect(422)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual([
      { field: "email", message: "has already been taken" },
    ]);
  });

  it("Failed to create user with invalid Gender field value", async () => {
    user = {
      name: "Amy wong",
      gender: "Unknown",
      email: "amy8@planetexpress.com",
      status: "active",
    };
    const response = await apiRequest
      .post(usersUrl)
      .set(commonHeaders)
      .send(user)
      .expect(422);
  });

  it("Updated user details successfully", async () => {
    user = {
      id: userId,
      name: "Amy Wong",
      gender: "female",
      email: "amyw@planetexpress.com",
      status: "active",
    };
    const response = await apiRequest
      .put(userUrl)
      .set(commonHeaders)
      .send({ name: user.name, email: user.email })
      .expect(200, user);
  });

  it("Got user details successfully after editing", async () => {
    await validateUser();
  });

  it("Deleted user successfully", async () => {
    //204: The request was handled successfully and the response contains no body content
    //(like a DELETE request).
    const response = await apiRequest
      .delete(userUrl)
      .set(commonHeaders)
      .expect(204);
  });

  it("Failed to get user details after deleting user", async () => {
    return await apiRequest.get(userUrl).set(commonHeaders).expect(404);
  });

  it("failed to Delete non exsisting user", async () => {
    userUrl = usersUrl + "/1111111" + userId;
    const response = await apiRequest
      .delete(userUrl)
      .set(commonHeaders)
      .expect(404);
  });
});
