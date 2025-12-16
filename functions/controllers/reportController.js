const pool = require('../db.js');
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// Load environment variables
require('dotenv').config();

exports.userProgressDetails = async (req, res) => {
  const { user_id } = req.body;

  try {
    // get garbage types
    const garbageTypeResult = await pool.query("SELECT id, name FROM garbage_type");
    const garbageTypeResultJSON = garbageTypeResult.rows;

    // get user progress safely
    const userProgressResult = await pool.query(
      `SELECT 
        progress.count::double precision AS count, 
        progress.garbage_type_id::int AS garbage_type_id
        FROM progress 
        JOIN report ON progress.report_id = report.id 
        WHERE report.user_id = $1`,
      [user_id]
    );

    const userProgressJSON = userProgressResult.rows;

    res.status(200).json({
      message: "Details compiled successfully!",
      garbage_types: garbageTypeResultJSON,
      user_progress: userProgressJSON,
    });
  } catch (error) {
    console.error("Error during compiling progress:", error);
    res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

exports.insertReport = async (req, res) => {
    const { photo, user_id, garbage_type_id, count } = req.body;
    try {
        var report_id = uuidv4();
        await pool.query("INSERT INTO report (id, photo, user_id) VALUES ($1, $2, $3) RETURNING *", [report_id, photo, user_id]);
        var progress_id = uuidv4();
        await pool.query("INSERT INTO progress (id, garbage_type_id, count, report_id) VALUES ($1, $2, $3, $4) RETURNING *", [progress_id, garbage_type_id, count, report_id]);
        res.status(201).json({ message: 'Report created successfully' });
    } catch (error) {
        console.error('Error during creating report:', error);
        res.status(500).json({ message: 'Internal server error:${error}' });
    }
};

exports.fetchReportsByUserID = async (req, res) => {
    const { user_id } = req.body;
    try {
        const result = await pool.query('SELECT * FROM report WHERE user_id = $1', [user_id]);
        const reportsJson = result.rows.map(row => ({
            id: row.id,
            photo: row.photo,
            user_id: row.user_id
        }));
        res.status(200).json({ message: 'Report fetch successful', reports: reportsJson });
    } catch (error) {
        console.error('Error during fetching report:', error);
        res.status(500).json({ message: 'Internal server error:${error}' });
    }
};