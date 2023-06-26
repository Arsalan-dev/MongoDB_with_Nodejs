const express = require("express");
const { connectToDb, getDb } = require("./db");
const bookRoutes = require("./routes/books");

//import controller
const bookController = require("./controllers/bookController");

//init app & middleware
const app = express();
app.use(express.json());

//routes
app.use("/books", bookRoutes);

//db connection
let db;

connectToDb((error) => {
    if (!error) {
      app.listen(3000, () => {
        console.log("app listening on port 3000");
      });
      db = getDb();
      //Pass the 'db' object to the controller
      bookController.init(db);
    }
  });




