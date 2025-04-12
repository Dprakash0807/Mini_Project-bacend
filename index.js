const port = 4000;// set poert to 4000
const express = require('express');// import express
const app = express();// create an instance of express
const mongoose = require('mongoose');// import mongoose
const jwt = require('jsonwebtoken');// import jwt
const multer = require('multer');// import multer
const path = require('path');// import path
const cors = require('cors');// import cors

app.use(express.json());// use express.json() middleware to parse JSON data
app.use(cors());// use cors middleware to enable CORS

//database connection
mongoose.connect("mongodb+srv://killerdr2089:divyaprakash@cluster1.3sc6qho.mongodb.net/e-commerce");

//api create 

app.get('/', (req, res) => {
    res.send("Hello World");// send Hello World message
})

//image storage
const storage = multer.diskStorage({
    destination: './upload/image',
    filename: (req,file,cb)=> {
            return cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)// set the filename to fieldname and current date
    }
})


const upload = multer({storage:storage,})

//create upload endpoint
app.use('/upload/image', express.static('./upload/image'))// set the static path for image upload
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/image/${req.file.filename}`// access the upload image 

    })// send the file as response
})
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port" +port);
    }
    else{
        console.log("error in server:" +error);
    }
})