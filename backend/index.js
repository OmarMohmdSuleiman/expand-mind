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

  app.get('/students', async (req, res) => {
    try {
      const result = await db.query(
        `SELECT users.user_id, users.name, users.email FROM users WHERE users.role = 'student'`
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).send('Error fetching students');
    }
  });

  app.post('/enrollments', async (req, res) => {
    const { user_id, course_id } = req.body;
    console.log("Received data:", req.body);
  
    if (!user_id || !course_id) {
      return res.status(400).json({ message: 'Student ID and Course ID are required' });
    }
  
    try {
      // Check if student exists
      const checkStudent = await db.query("SELECT * FROM users WHERE user_id = $1 AND role = 'student'", [user_id]);
      if (checkStudent.rows.length === 0) {
        return res.status(404).json({ message: 'Student not found or invalid role' });
      }
  
      // Check if course exists
      const checkCourse = await db.query("SELECT * FROM courses WHERE course_id = $1", [parseInt(course_id, 10)]);
      if (checkCourse.rows.length === 0) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Check if enrollment already exists
      const checkEnrollment = await db.query(
        "SELECT * FROM enrolments WHERE user_id = $1 AND course_id = $2",
        [user_id, course_id]
      );
      if (checkEnrollment.rows.length > 0) {
        return res.status(400).json({ message: 'Student is already enrolled in this course' });
      }
  
      // Add enrollment
      const result = await db.query(
        "INSERT INTO enrolments (user_id, course_id) VALUES ($1, $2) RETURNING *",
        [user_id, course_id]
      );
  
      res.status(201).json({ message: 'Enrollment successful', enrollment: result.rows[0] });
    } catch (error) {
      console.error('Error enrolling student:', error);
      res.status(500).json({ message: 'Error enrolling student', error: error.message });
    }
  });
  
  app.get('/enrollments', async (req, res) => {
    try {
      // Fetch all enrollments with course and student details
      const result = await db.query(`
        SELECT 
          users.name AS student_name,
          courses.title AS course_name
        FROM enrolments
        JOIN users ON enrolments.user_id = users.user_id
        JOIN courses ON enrolments.course_id = courses.course_id
      `);
  
      // Grouping enrollments by student name
      const groupedEnrollments = result.rows.reduce((acc, curr) => {
        const { student_name, course_name } = curr;
        const existingStudent = acc.find(item => item.name === student_name);
  
        if (existingStudent) {
          existingStudent.courses.push(course_name);
        } else {
          acc.push({ name: student_name, courses: [course_name] });
        }
  
        return acc;
      }, []);
  
      res.status(200).json(groupedEnrollments);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      res.status(500).json({ message: 'Error fetching enrollments', error: error.message });
    }
  });
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });