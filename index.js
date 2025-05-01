import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

const authRoute = require("./routes/authRoute");

dotenv.config();

const app = express();

app.use("/auth",authRoute);
app.use(express.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || '5432'),
});


const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => { console.log(`listening on port ${port}`);
});