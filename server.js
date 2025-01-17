const http = require('http');
const express= require("express");
const cors = require("cors");

const app = express();

const dbConfig = require('./db')
const packagesRoute = require('./routes/packagesRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')
const resourcesRoute = require('./routes/resourcesRoute')

app.use(express.json());
app.use(cors());

app.use('/api/packages', packagesRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)
app.use('/api/resources', resourcesRoute)

const port= process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));