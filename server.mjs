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
app.get('/api/gymox', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM exercises ORDER BY id ASC;');
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).send('Server Error');
        console.log(error);
    }
});

app.get('/api/gymox/:movement', async (req, res) => {
    const movement = req.params.movement;
    console.log(movement);
    try {
        const {rows} = await pool.query('SELECT * FROM exercises WHERE movement LIKE $1', [`%${movement}%`]);
        if (rows.length === 0) {
            res.status(404).send('No matching entries');
            console.log('No matching entries');
        } else {
            res.status(200).json(rows);
            console.log('Entries Found');
        }
    } catch (error) {
        res.json(error)
        console.log(error);
    }
});
//LISTENER===========================
app.listen(port, () => {
    console.log('Server Running');
});