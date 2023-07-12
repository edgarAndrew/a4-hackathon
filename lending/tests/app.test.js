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
        .post("/lending/api/v1/auth/login")
        .send(credentials);
      expect(response.statusCode).toBe(200); // check the status code
      cookie = response.headers["set-cookie"];
      expect(response.headers["set-cookie"]).toBeDefined(); // check the cookie is set
      // or expect(response.body.token).toBeDefined(); // check the token is returned
    });
    test("should verify jwt token", async () => {
      const res = await request(app)
        .get("/lending/api/v1/auth/verify-jwt")
        .set("Cookie", cookie);
      expect(res.statusCode).toBe(200);
    });
    test("Login with invalid credentials", async () => {
      const credentials = {
        email: "admin@codehomies.com",
        password: "admin",
      };
      const response = await request(app)
        .post("/lending/api/v1/auth/login")
        .send(credentials);
      expect(response.statusCode).toBe(401); // check the status code
      // or expect(response.body.token).toBeDefined(); // check the token is returned
    });
  });
});
describe(" /lending", () => {
  describe("lending functionality", () => {
    var books;
    var book_id = "648a2522fed267e09bd9fe5e";
    var student_id = "648a1cce8542e7caa97bcc32";
    const issue_details = {
      student: student_id,
      book: book_id,
    };
    //issue book
    test("should issue the book", async () => {
      const res = await request(app)
        .post("/lending/api/v2/")
        .send(issue_details)
        .set("Cookie", cookie);
      expect(res.statusCode).toBe(201);
    });

    // books taken by the user
    test("should return list of books taken by the user", async () => {
      const res = await request(app)
        .get("/lending/api/v2/books-taken/" + student_id)
        .set("Cookie", cookie);
      books = res.body["books"];
      expect(res.statusCode).toBe(200);
      expect(books[0]._id).toEqual("648a2522fed267e09bd9fe5e");
      expect(books[0].status).toEqual("issued");
    });
    // students who has taken the book
    test("should get the student details who has taken the book", async () => {
      const res = await request(app)
        .get("/lending/api/v2/students-taken/" + book_id)
        .set("Cookie", cookie);
      students = res.body["students"];
      expect(res.statusCode).toBe(200);
      expect(students[students.length - 1]._id).toEqual(
        "648a1cce8542e7caa97bcc32"
      );
      expect(students[students.length - 1].status).toEqual("issued");
    });

    // transactions
    test("should get the transaction details", async () => {
      const res = await request(app)
        .get("/lending/api/v2/?status=issued")
        .set("Cookie", cookie);
      transactions = res.body["transactions"];
      expect(res.statusCode).toBe(200);
      expect(transactions[transactions.length - 1].book).toContain(
        issue_details.book
      );
      expect(transactions[transactions.length - 1].student).toContain(
        issue_details.student
      );
      expect(transactions[transactions.length - 1].status).toContain("issued");
    });

    //return book
    test("should return the book", async () => {
      const res = await request(app)
        .post("/lending/api/v2/return")
        .send(issue_details)
        .set("Cookie", cookie);
      expect(res.statusCode).toBe(200);
    });
  });
});
