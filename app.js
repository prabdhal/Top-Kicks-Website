if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

// Import Routes & Schemas
const userRoute = require("./routes/users");
const indexRoute = require("./routes/index");

const app = express();

// Passport Config
require("./config/passport")(passport);

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

// Register View Engine
app.set("view engine", "ejs");

// Static File
app.use(express.static("public"));
app.use(morgan("dev"));

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Gobal Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// ROUTES
app.use("/", userRoute);
app.use("/", indexRoute);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// LISTEN TO PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, (e) => {
  console.log(`Local host is connected to port ${PORT}...`);
});
