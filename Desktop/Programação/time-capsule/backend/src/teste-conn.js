const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'capsuleuser',
  password: 'capsulepass',
  database: 'capsuledb',
  port: 5432
});

pool.query('SELECT * FROM time_capsules', (err, res) => {
  if (err) {
    console.error('Erro ao consultar:', err);
  } else {
    console.log('Dados encontrados:', res.rows);
  }
  pool.end();
});
