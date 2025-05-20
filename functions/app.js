const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute.js");

app.use(express.json()); // for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auth", authRoutes); // base route
app.use("/", ((req,res)=>{res.status(200).json({"message":"Success"})}))

module.exports = app;