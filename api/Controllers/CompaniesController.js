// const express = require('express');
// const router = express.Router();
// const { CompaniesModel, UsersModel } = require("../Models/index");
// const jwt = require("jsonwebtoken");
// require('dotenv').config();

// // const authenticateToken = (req, res, next) => {
// //     const token = req.header('Authorization').split(' ')[1];
// //     if (!token) return res.status(401).send({ message: 'Access Denied' });

// //     try {
// //         const verified = jwt.verify(token, process.env.SECRET_KEY);
// //         req.user = verified;
// //         next();
// //     } catch (error) {
// //         res.status(400).send({ message: 'Invalid Token' });
// //     }
// // };

// router.post('/company', async (req, res) => {
//     try {
//         const { companyName, companyType, companyPhone, companyEmail, companyAddress,studentID } = req.body;

//         const newCompany = await CompaniesModel.create({
//             companyName,
//             companyType,
//             companyPhone,
//             companyEmail,
//             companyAddress,
//             studentID
//         });

//         res.status(201).send({ message: "Success", newCompany });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.get('/company', async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.user._id);
//         if (!user) return res.status(404).send({ message: 'User not found' });

//         res.send(user);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { CompaniesModel, UsersModel } = require("../Models/index");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).send({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};

router.post('/company',async (req, res) => {
    try {
        const { companyName, companyType, companyPhone, companyEmail, companyAddress, studentID } = req.body;
        const existingCompany = await CompaniesModel.findOne({ where: { studentID } });

        if (existingCompany) {
            return res.status(201).send({ message: "existingCompany" });
        }

        const newCompany = await CompaniesModel.create({
            companyName,
            companyType,
            companyPhone,
            companyEmail,
            companyAddress,
            studentID // เพิ่ม studentID เพื่อเชื่อมโยงกับผู้ใช้
        });

        res.status(201).send({ message: "Success", newCompany });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/company/:studentID', authenticateToken, async (req, res) => {
    try {
        const studentID = req.params.studentID;
        const user = await UsersModel.findOne({
            where: { studentID },
            include: [{
                model: CompaniesModel,
                as: 'companyDetails'
            }]
        });
        if (!user) return res.status(404).send({ message: 'User not found' });
        if (!user.companyDetails) return res.status(404).send({ message: 'Company not found' });

        res.send(user.companyDetails);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
