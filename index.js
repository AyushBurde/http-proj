const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let students = [
  { id: 1, name: "Ayush", age: 20, course: "Web Dev" },
  { id: 2, name: "Riya", age: 21, course: "AI/ML" },
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// GET single student by id
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// POST new student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    age: Number(age), // ensure number
    course,
  };

  students.push(newStudent);
  console.log("New student added:", newStudent);
  res.status(201).json(newStudent);
});

// PUT update student
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, course } = req.body;
  const student = students.find(s => s.id == id);

  if (!student) return res.status(404).json({ error: "Student not found" });

  student.name = name || student.name;
  student.age = age ? Number(age) : student.age;
  student.course = course || student.course;

  res.json(student);
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  students = students.filter(s => s.id != id);
  res.json({ message: "Student deleted" });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
