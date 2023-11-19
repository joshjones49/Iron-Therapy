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

//exercises
app.get('/api/ironT', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM exercises ORDER BY id ASC;');
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).send('Server Error');
        console.log(error);
    }
});
//get workouts 
app.get('/api/ironT/workouts', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM workout ORDER BY id ASC;');
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).send('Server Error');
        console.log(error);
    }
});
//members
app.get('/api/ironT/members', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM member ORDER BY id ASC;');
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).send('Server Error');
        console.log(error);
    }
});
//get similar
app.get('/api/ironT/:movement', async (req, res) => {
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
//create 1================================

//workout
app.post('/api/ironT', async (req, res) => {
    const { name, script } = req.body;

    if (!name || !script) {
        return res.status(400).json('Name And List Required');
    }
     try {
        const {rows} = await pool.query(
            'INSERT INTO workout (name, script) VALUES ($1, $2) RETURNING*',
            [name, script]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
//member
app.post('/api/ironT/member', async (req, res) => {
    const { fname, lname, email } = req.body;

    if (!fname || !lname || !email) {
        return res.status(400).json('All fields required');
    }
     try {
        const {rows} = await pool.query(
            'INSERT INTO member (fname, lname, email) VALUES ($1, $2, $3) RETURNING*',
            [fname, lname, email]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
//delete 1==========================

//workout
app.delete('/api/ironT/workout/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const {rows} = await pool.query('DELETE FROM workout WHERE name = $1', [name]);
        res.status(200).send(rows);
    } catch (error) {
        res.json(error)
        console.log(error);
    }
});
//member
app.delete('/api/ironT/:workout', async (req, res) => {
    const workout = req.params.workout;
    try {
        const {rows} = await pool.query('DELETE FROM workout WHERE name = $1', [workout]);
        res.status(200).send(rows);
    } catch (error) {
        res.json(error)
        console.log(error);
    }
});
//patch 1======================================

//
app.patch('/api/ironT/:id', async (req, res) => {
    const id = req.params.id;
    const { name, script } = req.body;

    if (!script && !script) {
        return res.status(400).json('At least one field required for update');
    }
    try {
        const { rows } = await pool.query(
            'UPDATE workout SET name = COALESCE($1, name), script = COALESCE($2, script) WHERE id = $3 RETURNING*',
            [name, script, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'List not found' });
        }
        res.status(200).json(rows[0]);
        console.log('List Updated');
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
//LISTENER===========================
app.listen(port, () => {
    console.log('Server Running');
});