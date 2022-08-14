const express = require("express");
const bodyParer = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

var connectString =
  "mongodb+srv://pari:FADFYrwi7EF1RW1a@cluster0.c2taoab.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectString, (err, client) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
  const db = client.db("CRUD");
  const quotesCollection = db.collection('quotes')

  app.use(bodyParer.urlencoded({ extended: true }));

  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
  });

  app.listen(3000, function () {
    console.log("Listening on port: 3000");
  });

  app.post("/quotes", async (req, res) => {
   const insertQuote = await quotesCollection.insertOne(req.body)
   console.log(insertQuote)
   res.redirect('/')
  });
});
