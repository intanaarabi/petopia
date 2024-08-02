const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const corsConfig = require('./config/cors');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

const environment = process.env.NODE_ENV || 'development';
app.use(cors(corsConfig[environment]));

// Routes
app.use('/', require('./routes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
