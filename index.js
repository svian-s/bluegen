import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || '5432'),
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: "username and password required" });
  }
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE username=$1 AND password=$2",
      [username, password]
    );
    client.release();
    if (result.rows.length > 0) {
      res.status(200).send({ message: "Login successful" });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => { console.log(`listening on port ${port}`);
});