const express= require("express");

const app = express();

const dbConfig = require('./db')
const packagesRoute = require('./routes/packagesRoute')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Set other CORS headers as needed
    next();
});

app.use('/api/packages', packagesRoute)

const port= process.env.PORT || 5000;

app.listen(port, ()=> console.log('Node Server Started using nodemon'));