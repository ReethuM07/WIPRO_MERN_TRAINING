const express = require('express');
const cors = require('cors');
require('dotenv').config();

const programRoutes = require('./routes/programRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/programs', programRoutes);
app.use('/api/enroll', enrollmentRoutes);

app.use(errorHandler);

module.exports = app;