const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

port = process.env.port || 4000;

const app = express();
dotenv.config();

//middle ware to be used
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "Secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use("/", require("./routes/routes"));

//connect to a database
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(port, () => console.log(`App running on port ${port}`));
  })
  .catch((err) => console.log(err.message));
