const Course = require('../models/courseModel');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
};

exports.createCourse = async (req, res) => {
  const { nombre, precio, categoria, autor } = req.body;
  
  // Validar que la categoría sea una de las predefinidas
  const validCategories = ['Tecnología', 'Matemáticas', 'Inglés','Sociales', 'Diseño', 'Marketing'];
  if (!validCategories.includes(categoria)) {
    return res.status(400).json({ error: 'Categoría inválida' });
  }

  try {
    const newCourse = await Course.create({ nombre, precio, categoria, autor });
    res.json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error creating course' });
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, categoria, autor } = req.body;
  
  // Validar que la categoría sea una de las predefinidas
  const validCategories = ['Tecnología', 'Matemáticas', 'Inglés'];
  if (!validCategories.includes(categoria)) {
    return res.status(400).json({ error: 'Categoría inválida' });
  }

  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    await course.update({ nombre, precio, categoria, autor });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error updating course' });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    await course.destroy();
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting course' });
  }
};
