const Joi = require("joi");
const logger = require("./logger");
const express = require("express");
const app = express();

app.use(express.json());
app.use(logger);

const courses = [
  { id: 1, name: "Intro to Programming." },
  { id: 2, name: "Web Development Fundamentals." },
  { id: 3, name: "JavaScript for Dummies." }
];

app.get("/", (req, res) => {
  res.send("Hello world!");
  res.end();
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
  res.end();
});

app.get("/api/courses/:id", (req, res) => {
  var course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("The course with the given ID does not exist!");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  var course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);

  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  var course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID does not exist!");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  var course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID does not exist!");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
