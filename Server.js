import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDb from './Controller/Db.js';
import bcrypt from 'bcrypt';
import userModel from './Models/User.js';
import router from './Routes/registerRoute.js'; 
import router1 from './Routes/loginRoute.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();


connectToDb();
const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization", 
};


app.use(cors(corsOptions));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/register', router);

app.use('/login', router1);



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});