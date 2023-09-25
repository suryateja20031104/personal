const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/loginr/", async (request, response) => {
  const getBooksQuery = `
    SELECT
      *
    FROM
      per;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});

app.post("/login/", async (request, response) => {
  const bookDetails = request.body;
  const { username, password } = bookDetails;
  const addBookQuery = `
    INSERT INTO
      per (username,password)
    VALUES
      (
        '${username}',
        '${password}'
      );`;

  const dbResponse = await db.run(addBookQuery);
  response.send("success");
});
