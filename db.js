require('dotenv').config()
const mongoose = require('mongoose');

// mongpdb atlas database name : db_media

const mongodb_url = "mongodb+srv://kvishwa1:Snow123456@cluster0.58aot.mongodb.net/mediaAppDB"
// const mongodb_url = "mongodb://127.0.0.1:27017/mediaAppDB"

mongoose.connect( mongodb_url, 
    { useNewUrlParser: true }).then(()=>{
        console.log("Connected to Database")
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    })