/* Imports */

import './styles.scss';
import './js/main.js'

const path = require('path');
const express = require('express');
const app = express();
const publicDirectoryPath = path.join(__dirname, '..', 'dist');

/* Static files path */
app.use(express.static(publicDirectoryPath));

/* Ejs usage */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'dist', 'views'));

// Initial Routes
app.get('/', async (req, res) => res.render('home/index'));
app.get('/secondary', async (req, res) => res.render('page/index'));

// Main Server Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server configuration and start
const PORT = 4400;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});