const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

class User {
  constructor(username, password) {
      this.username = username;
      this.password = password;
  }

  async hashPassword() {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await pool.query(query, [username]);
    if (rows.length > 0) {
        const user = rows[0];
        return new User(user.username, user.password);
    }
    return null;
  }

  async checkPassword(password) {
      try {
        return await bcrypt.compare(password, this.password);
      } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
      }
    }
}

module.exports = User;