const express = require("express");
const session = require("express-session");
require("dotenv").config();
require("./db");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// ⭐⭐ ADD THIS ⭐⭐
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

app.use("/", require("./routes/auth"));
app.use("/items", require("./routes/items"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
