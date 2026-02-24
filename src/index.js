const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

dbConnect();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})