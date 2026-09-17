const pool = require("../../database/connection");

async function findAll() {
    const result = await pool.query(`
        SELECT id, nome AS name
        FROM categorias
        ORDER BY id;
    `);

    return result.rows;
}

module.exports = { findAll };
