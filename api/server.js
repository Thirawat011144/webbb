const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const path = require('path');

// const DownloadsModel = require('./Models/Downloads')

// const sequelize = require('./connect') ทดสอบการเชื่อมต่อ Database
// const CompaniesModel = require('./Models/Companies')

const RegisterController = require("./Controllers/RegisterController")
const LoginController = require("./Controllers/LoginController")
const UsersController = require("./Controllers/UsersController")
const NewsController = require("./Controllers/NewsController")
const InternshipController = require('./Controllers/InternshipController')
const PracticeTeachingController = require('./Controllers/PracticeTeachingController')
const CompaniesController = require("./Controllers/CompaniesController")


const app = express()
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api', RegisterController)
app.use('/api', LoginController)
app.use('/api', UsersController)
app.use('/api', NewsController)
app.use('/api', CompaniesController)
app.use('/api', InternshipController)
app.use('/api', PracticeTeachingController)

app.listen(port, () => {
    console.log(`Example app listening on port`, port);
});