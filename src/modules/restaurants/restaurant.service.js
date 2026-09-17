const pool = require("../../database/connection");

async function findAll() {
    const result = await pool.query(`
        SELECT r.id, r.nome AS name, c.nome AS category, r.avaliacao AS rating
        FROM restaurantes r
        INNER JOIN categorias c ON r.categoria_id = c.id
        ORDER BY r.id;
    `);

    return result.rows;
}

async function findById(id) {
    const result = await pool.query(`
        SELECT r.id, r.nome AS name, c.nome AS category, r.avaliacao AS rating
        FROM restaurantes r
        INNER JOIN categorias c ON r.categoria_id = c.id
        WHERE r.id = $1;
    `, [id]);

    return result.rows[0];
}

async function categoryExists(categoryId) {
    const result = await pool.query(
        "SELECT id FROM categorias WHERE id = $1",
        [categoryId]
    );

    return result.rows.length > 0;
}

async function create({ name, categoryId, rating }) {
    const result = await pool.query(`
        INSERT INTO restaurantes (nome, categoria_id, avaliacao)
        VALUES ($1, $2, $3)
        RETURNING id, nome, categoria_id, avaliacao;
    `, [name, categoryId, rating]);

    return result.rows[0];
}

module.exports = { findAll, findById, categoryExists, create };