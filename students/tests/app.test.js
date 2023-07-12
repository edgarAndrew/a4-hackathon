const request = require("supertest");
const app = require("../index"); // your express app

var cookie;

describe(" /login", () => {
  describe("given a user and pass ", () => {
    test("Login with valid credentials", async () => {
      const credentials = {
        email: "admin@codehomies.com",
        password: "admin123",
      };
      const response = await request(app)
        .post("/students/api/v1/auth/login")
        .send(credentials);
      expect(response.statusCode).toBe(200); // check the status code
      cookie = response.headers["set-cookie"];
      expect(response.headers["set-cookie"]).toBeDefined(); // check the cookie is set
      // or expect(response.body.token).toBeDefined(); // check the token is returned
    });
    test("should verify jwt token", async () => {
      const res = await request(app)
        .get("/students/api/v1/auth/verify-jwt")
        .set("Cookie", cookie);
      expect(res.statusCode).toBe(200);
    });
    test("Login with invalid credentials", async () => {
      const credentials = {
        email: "admin@codehomies.com",
        password: "admin",
      };
      const response = await request(app)
        .post("/students/api/v1/auth/login")
        .send(credentials);
      expect(response.statusCode).toBe(401); // check the status code
      // or expect(response.body.token).toBeDefined(); // check the token is returned
    });
  });
});
describe(" /students", () => {
  describe("student CRUD operations", () => {
    const student_details = {
      email: "student3@codehomies.com",
      username: "student3",
      password: "student123",
      contact: "9359090587",
      image: null,
    };

    var student_id;
    //add student
    test("should add the student", async () => {
      const res = await request(app)
        .post("/students/api/v1/student/")
        .send(student_details)
        .set("Cookie", cookie);
      expect(res.statusCode).toBe(201);
    });

    // get all students
    test("should get the info all students", async () => {
      const res = await request(app)
        .get("/students/api/v1/student/")
        .set("Cookie", cookie);
      students = res.body["students"];
      student_id = students[students.length - 1]._id;
      expect(res.statusCode).toBe(200);
    });

    // Update student
    test("should update the student info", async () => {
      const res = await request(app)
        .patch("/students/api/v1/student/" + student_id)
        .send({
          username: "Student 4",
          contact: "8975444332",
        })
        .set("Cookie", cookie);

      console.log(res.body);
      expect(res.statusCode).toBe(200);
    });

    //delete student
    test("should delete the student", async () => {
      const res = await request(app)
        .delete("/students/api/v1/student/" + student_id)
        .set("Cookie", cookie);
      expect(res.statusCode).toBe(200);
    });
  });
});
