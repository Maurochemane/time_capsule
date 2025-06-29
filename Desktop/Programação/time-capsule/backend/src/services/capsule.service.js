
const { Pool } = require('pg');


// Configurar conexão PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


// Insere nova cápsula
exports.insertCapsule = async ({ name, message, image_url, open_year }) => {
    const result = await pool.query(
        `INSERT INTO time_capsules (name, message, image_url, open_year)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, message, image_url, open_year]
    );
    return result.rows[0];
};

// Obtém cápsulas cujo ano já chegou
exports.getCapsulesToOpen = async (currentYear) => {
    const result = await pool.query(
        `SELECT * FROM time_capsules WHERE open_year <= $1 ORDER BY open_year ASC`,
        [currentYear]
    );
    return result.rows;
};

