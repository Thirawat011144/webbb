const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');

// const sequelize = require('./connect') ทดสอบการเชื่อมต่อ Database

const RegisterController = require("./Controllers/RegisterController")
const LoginController = require("./Controllers/LoginController")
const UsersController = require("./Controllers/UsersController")


const app = express()
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', RegisterController)
app.use('/api', LoginController)
app.use('/api', UsersController)

app.listen(port, () => {
    console.log(`Example app listening on port`, port);
});