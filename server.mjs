//DEPENDENCIES======================
import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const port = 8000;
import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});
//MIDDLEWARE===========================
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
//ROUTES=============================
//get all
app.get('/api/database', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM _______ ORDER BY id ASC;');
        res.status(200).send(rows)
    } catch (error) {
        res.status(500).send('Server Error');
        console.log(error);
    }
});
//LISTENER===========================
app.listen(port, () => {
    console.log('Server Running');
});