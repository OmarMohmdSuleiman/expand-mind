import express from "express";
import pg from "pg";


const app = express();
const port = 4000;

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();

app.get('/', (req, res) => {
    res.status(200).send("Ready");
});

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });