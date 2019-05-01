const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();
router.use(express.json());

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

router.get('/', (req, res) =>
{
  res.send(JSON.stringify(courses));
});

router.post('/', (req, res) =>
{
  const { error } = validateCourse(req.body);
  console.log(error);

  if (error) return res.status(400).send('Invalid Parameter Error', error.details[0].message);

  course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
});

router.get('/:id', (req, res) =>
{
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Not found');
  res.send(course)
});

router.put('/:id', (req, res) =>
{
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Not found');

  // Update Course
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send('Invalid Parameter', error.details[0].message);
  course.name = req.body.name;
  res.send(course);
});

router.delete('/:id', (req, res) =>
{
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Not found');
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
});

function validateCourse(course)
{
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;