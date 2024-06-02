const express=require('express');
const mysql = require('mysql');
const doenv = require("dotenv");
const path = require("path");
const app = express();
const hbs = require("hbs");
const cookieParser = require('cookie-parser');


doenv.config({
    path: "./.env",
  });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err){
        console.log(err);
    }
    else{
        console.log("MySQL connection success")
    }
});
app.use(cookieParser());


app.use(express.urlencoded({ extended: false}));
const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine","hbs");

//const partialLoc = path.join(__dirname, "./views/group");
//hbs.registerPartials(partialLoc);

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(5500,() => {
    console.log("Server started @ Port 5500");
});