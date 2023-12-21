const express = require("express");
const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./gik339-labb2.db");
const sql = "SELECT * FROM users";

server.listen(3000, () => {
  console.log("servern är igång");
});

server.get("/users", (req, res) => {
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send("Hoppsan där blev det fel: ", err);
    }

    res.send(rows);
  });
});
