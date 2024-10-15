const sqlite3 = require("sqlite3").verbose();
const path = require("path");

//defining the path for db file
const dbPath = path.resolve(__dirname, "db", "emails.db");

//creating the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database connection successfull");
    //creating the table: 1. Sender is the organization sending the email, 2. Content is the actual email, 3.Edition is the week [i.e.: Oct 9 - Oct 15]
    db.run(
      "CREATE TABLE IF NOT EXISTS emails (id INTEGER PRIMARY KEY AUTOINCREMENT,sender TEXT, content TEXT, edition TEXT);",
      (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Table Created or existed");
        }
      }
    );
  }
});

module.exports = db;
