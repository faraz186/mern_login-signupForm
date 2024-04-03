require('dotenv').config()
const express = require('express');
const dotenv = require('dotenv');
const router = require('../routes/index.js');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

mongoose.connect(process.env.DB_URI).then((res)=>{
    console.log("database connected..")
}).catch((err)=>{
    console.log(err)   
})

app.listen(PORT,()=>{
    console.log(`server is running on http:localhost:${PORT}`)
})
