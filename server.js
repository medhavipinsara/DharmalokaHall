const http = require('http');
const express= require("express");
const cors = require("cors");

const app = express();

const dbConfig = require('./db')
const packagesRoute = require('./routes/packagesRoute')
const usersRoute = require('./routes/usersRoute')

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     // Set other CORS headers as needed
//     next();
// });

app.use('/api/packages', packagesRoute)
app.use('/api/users', usersRoute)

const port= process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));

//app.listen(port, ()=> console.log('Node Server Started using nodemon'));