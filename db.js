const mongoose = require('mongoose');

var mongoUrl = 'mongodb+srv://samadiperera2011:sam200011@dharamlokahall.bg1lenu.mongodb.net/DharmalokaHall'


mongoose.connect(mongoUrl, {useUnifiedTopology :true, useNewUrLParser :true})

var connection = mongoose.connection

connection.on('error', () =>{
console.log("Mongo DB Connection failed")
});

connection.on('connected', () =>{
    console.log("Mongo DB Connection successful")
    });
    

module.exports = mongoose