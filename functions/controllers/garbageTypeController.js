const pool = require('../db.js');
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

exports.fetchGarbageTypes = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM garbage_type");
        const resultJson = result.rows.map(row => ({
            id: row.id,
            name: row.name
        }));
        res.status(200).json({ message: 'Garbage Type Fetch Successful', garbage_types: resultJson },);

    } catch (error) {
        console.error('Error during fetching garbage types:', error);
        res.status(500).json({ message: 'Internal server error:${error}' });
    }

};
