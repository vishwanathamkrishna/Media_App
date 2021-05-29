require('dotenv').config()
const mongoose = require('mongoose');

// mongodb atlas database name : mediaAppDB
const mongodb_url = "mongodb://127.0.0.1:27017/mediaAppDB"

mongoose.connect( mongodb_url, 
    { useNewUrlParser: true }).then(()=>{
        console.log("Connected to Database")
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    })
