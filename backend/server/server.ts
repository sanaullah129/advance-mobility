import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import pool from './database';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3200;

app.use(express.json());
app.use(cors);

pool.query("SELECT * FROM vehicles")
    .then(([rows]) => {
        console.log(rows);
    })
    .catch(error => {
        console.log("SQL Error: " + error);
    });

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})
