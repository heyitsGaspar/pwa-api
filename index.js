const express = require('express');
const cors = require('cors'); 
const sequelize = require('./config/database');
const courseRoutes = require('./router/courseRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

app.use('/api/courses', courseRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database connected!');
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  })
  .catch(error => console.log('Error connecting to the database:', error));
