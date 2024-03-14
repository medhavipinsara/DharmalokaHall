const express= require("express");

const app = express();

const dbConfig = require('./db')
/*const hallRouter = require('./routes/hallRouter')

app.use('/api/halls', hallRouter)*/

const port= process.env.PORT || 5000;

app.listen(port, ()=> console.log('Node Server Started using nodemon'));