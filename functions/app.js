const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute.js");
const reportRoutes = require("./routes/reportRoute.js");
const garbageRoutes = require("./routes/garbageRoute.js");

app.use(express.json()); // for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auth", authRoutes); // base route
app.use("/report", reportRoutes);
app.use("/garbage_type", garbageRoutes);
app.use("/", ((req,res)=>{res.status(200).json({"message":"It works!"})}))
module.exports = app;