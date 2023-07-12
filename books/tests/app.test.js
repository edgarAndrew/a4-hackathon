const request = require("supertest");
const app = require("../index"); // your express app

var cookie;

describe("POST /login", () => {
  describe("given a user and pass ", () => {
    test("Login with valid credentials", async () => {
      const credentials = {
        email: "admin@codehomies.com",
        password: "admin123",
      };
      const response = await request(app)
        .post("/books/api/v1/auth/login")
        .send(credentials);
      expect(response.statusCode).toBe(200); // check the status code
      cookie = response.headers["set-cookie"];
      expect(response.headers["set-cookie"]).toBeDefined(); // check the cookie is set
      // or expect(response.body.token).toBeDefined(); // check the token is returned
    });
    test("should verify jwt token", async () => {
      const res = await request(app)
        .get("/books/api/v1/auth/verify-jwt")
        .set("Cookie", cookie);
      expect(res.statusCode).toBe(200);
    });
    test("Login with invalid credentials", async () => {
      const credentials = {
        email: "admin@codehomies.com",
        password: "admin",
      };
      const response = await request(app)
        .post("/books/api/v1/auth/login")
        .send(credentials);
      expect(response.statusCode).toBe(401); // check the status code
      // or expect(response.body.token).toBeDefined(); // check the token is returned
    });
  });
});
describe("POST /Books", () => {
  describe("CRUD book", () => {
    var books;
    var book;
    //add book
    test("should Add book with given details", async () => {
      const book_details = {
        isbn: "111812999",
        title: "Life of Sachin",
        author: "Sachin Padwalkar",
        description:
          "Operating System Concepts, now in its ninth edition, continues to provide a solid theoretical foundation for understanding operating systems. The ninth edition has been thoroughly updated to include contemporary examples of how operating systems function.The text includes content to bridge the gap between concepts andactual implementations. End-of-chapter problems, exercises, review questions, and programming exercises help to further reinforce important concepts. ",
        quantity: 6,
      };
      const res = await request(app)
        .post("/books/api/v1/book")
        .send(book_details)
        .set("Cookie", cookie);
      expect(res.statusCode).toBe(201);
    });

    // get all books
    test("should get all the books", async () => {
      const res = await request(app)
        .get("/books/api/v1/book")
        .set("Cookie", cookie);
      books = res.body["books"];
      book = books[books.length - 1];
      expect(res.statusCode).toBe(200);
    });
    //getting book by id
    test("should get the book by id", async () => {
      const res = await request(app)
        .get("/books/api/v1/book/" + book["_id"])
        .set("Cookie", cookie);
      // book = res.body["book"];
      expect(res.body["book"]).toBeDefined();
    });
    //edit book
    test("should update the book details", async () => {
      const res = await request(app)
        .patch("/books/api/v1/book/" + book["_id"])
        .send({ quantity: book["quantity"] + 1 })
        .set("Cookie", cookie);
      expect(res.statusCode).toBe(200);

      //getting updated book
      const response = await request(app)
        .get("/books/api/v1/book/" + book["_id"])
        .set("Cookie", cookie);
      var updated_book = response.body;
      expect(updated_book).toBeDefined();
      // checking if both are not equal
      expect(book).not.toBe(updated_book);
    });

    test("should delete the book", async () => {
      const res = await request(app)
        .del("/books/api/v1/book/" + book["_id"])
        .set("Cookie", cookie);

      expect(res.statusCode).toBe(200);
    });
  });
});