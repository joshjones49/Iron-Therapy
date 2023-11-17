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
//get similar
app.get('/api/gymox/:movement', async (req, res) => {
    const movement = req.params.movement;
    console.log(movement);
    try {
        const {rows} = await pool.query('SELECT * FROM exercises WHERE movement LIKE $1 OR target_area LIKE $1', [`%${movement}%`]);
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
//create 1
app.post('/api/gymox/', async (req, res) => {
    const { movement, target_area, push_pull_legs } = req.body;

    if (!movement && !target_area && !push_pull_legs ) {
        return res.status(400).json('Movement Name Required');
    }
     try {
        const {rows} = await pool.query(
            'INSERT INTO exercises (movement, target_area, push_pull_legs) VALUES ($1, $2, $3) RETURNING*',
            [movement, target_area, push_pull_legs]
        );
        res.status(201).send(rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
//delete 1
app.delete('/api/gymox/:movement', async (req, res) => {
    const movement = req.params.movement;
    try {
        const {rows} = await pool.query('DELETE FROM exercises WHERE movement = $1', [movement]);
        res.status(200).send(rows);
    } catch (error) {
        res.json(error)
        console.log(error);
    }
});
//patch 1
app.patch('/api/gymox/:id', async (req, res) => {
    const id = req.params.id;
    const { movement, target_area, push_pull_legs } = req.body;

    if (!movement && !target_area && !push_pull_legs) {
        return res.status(400).json('At least one field required for update');
    }
    try {
        const { rows } = await pool.query(
            'UPDATE exercises SET movement = COALESCE($1, movement), target_area = COALESCE($2, target_area), push_pull_legs = COALESCE($3, push_pull_legs) WHERE id = $4 RETURNING*',
            [movement, target_area, push_pull_legs, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        res.status(200).json(rows[0]);
        console.log('Movement Updated');
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
//LISTENER===========================
app.listen(port, () => {
    console.log('Server Running');
});