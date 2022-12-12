const express = require('express');

const app = express();

const dotenv = require('dotenv').config();

// cors
const cors = require('cors');

// port
const port = process.env.PORT || 3200;

// database connection
require('./Database/Database');

// parser
app.use(express.json());

// cors
app.use(cors());

// routers
app.use('/api',require('./Routers/UserRouter'));

app.use('/api/auth',require('./Routers/AuthRouter'));


app.listen(port,() =>{
    console.log(`Server started on http://localhost:${port}`);
})