import express from "express";
import pg from "pg";
import env from "dotenv";
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const saltRounds = 10;
env.config({ path: resolve(__dirname, '../.env') });


const app = express();
const port = 4000; 
app.use(cors());
app.use(express.json());

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

app.post('/',async (req,res)=>{
  const {email, password} = req.body;

  try{
    const checkUser=await db.query("SELECT * from users WHERE email=$1" , [email]);
    if(checkUser.rows.length===0){
      return res.redirect("/login?message=User%20does%20not%20exist");
    }
    const user=checkUser.rows[0];
    const passValid=await bcrypt.compare(password,user.password)
    if(!passValid){
      return res.redirect("/login?message=Incorrect%20password");
    }
    
    res.status(201).json(user);
  }catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
  
});

app.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
  
    if (!name || !email || !password || !role) {
      return res.status(400).send("All fields are required");
    }

    try {
      const checkResult=await db.query("SELECT from users WHERE email = $1" ,[email]);
      if (checkResult.rows.length > 0) {
        return res.redirect("/login?message=User%20already%20exists");
        
      }else{
        const hash=await bcrypt.hash(password,saltRounds);
        const result = await db.query(
          "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, email, hash, role]
        );
        const newUser = result.rows[0];
      res.status(201).json(newUser);
      }
      
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Error registering user");
    }
  }); 

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });