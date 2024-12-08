import express from "express";
import pg from "pg";


const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.status(200).send("Ready");
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });