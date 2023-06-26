const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

//init app & middleware
const app = express();
app.use(express.json());

//db connection
let db;

connectToDb((error) => {
  if (!error) {
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
    db = getDb();
  }
});

//routes
app.get("/books", (req, res) => {
  // current page
  const page = req.query.page || 0; // if req.query.page does have a value, it'll ignore logical OR, otherwise, default page is 0
  const booksPerPage = 3;
  
  let books = [];

  /*find method returns a cursor which is an object that essentially points 
  to a setup docs outlined by our query. 2 methods: toArray, forEach */

  /* .skip method is used to skip n number of pages (n = pages*booksPerPage)
    and then limit the result by booksPerPage which is the limit method */
  
  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No book found" });
  }
  db.collection("books")
    .findOne({ _id: new ObjectId(id) })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the document" });
    });
});

app.post("/books", (req, res) => {
  const book = req.body;
  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not create a new document" });
    });
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No book found" });
  }

  db.collection("books")
    .deleteOne({ _id: new ObjectId(id) })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not delete a book" });
    });
});

app.patch("/books/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No book found" });
  }

  db.collection("books")
    .updateOne({ _id: new ObjectId(id) }, { $set: updates })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not update the book" });
    });
});
