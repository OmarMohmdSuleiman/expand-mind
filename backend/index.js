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

app.post('/login',async (req,res)=>{
  const {email, password} = req.body;

  try{
    const checkUser=await db.query("SELECT * from users WHERE email=$1" , [email]);
    if(checkUser.rows.length===0){
      
      return res.status(404).json({ message: "User does not exist" });
    }

    const user=checkUser.rows[0];
    const passValid=await bcrypt.compare(password,user.password)
    if(!passValid){
      
       return res.status(401).json({ message: "Incorrect password" });
    }
    
    res.status(200).json(user);
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

  app.post('/admin-dashboard/add-course', async (req, res) => {
    const { name, description, instructorId } = req.body;
  
    if (!name || !instructorId) {
      return res.status(400).json({ message: 'Course name and instructor are required' });
    }
  
    try {
      const checkInstructor = await db.query("SELECT * FROM users WHERE user_id = $1 AND role = 'instructor'", [instructorId]);
      if (checkInstructor.rows.length === 0) {
        return res.status(404).json({ message: 'Instructor not found or invalid role' });
      }
  
      const result = await db.query(
        "INSERT INTO courses (title, description, instructor_id) VALUES ($1, $2, $3) RETURNING *",
        [name, description, instructorId]
      );
  
      res.status(201).json({ message: 'Course added successfully', course: result.rows[0] });
    } catch (error) {
      console.error('Error adding course:', error);  
      res.status(500).json({ message: 'Error adding course', error: error.message });
    }
  });
  app.get('/instructors', async (req, res) => { 
    try {
      const result = await db.query("SELECT user_id, name FROM users WHERE role = 'instructor'");
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      res.status(500).send('Error fetching instructors');
    }
  });

  app.get('/courses', async (req, res) => {
    try {
      const result = await db.query(`SELECT courses.course_id, courses.title, courses.description, users.name AS instructor_name
       FROM courses
       JOIN users ON courses.instructor_id = users.user_id`);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).send('Error fetching courses');
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });