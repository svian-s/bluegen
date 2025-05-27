// controllers/authController.js 
const bcrypt = require("bcrypt");

const pool = require('../db.js');

// Load environment variables
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.signUp = async (req, res) => {
    const {email, name, username, password, reportId} = req.body;
    try {
        const result = await pool.query("INSERT INTO bluegen.users column(email,name,username,password,reportId) VALUES ($1, $2, $3, $4, $5) RETURNING *", [email, name, username, password, reportId]);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error:${error}' });
    }
};
