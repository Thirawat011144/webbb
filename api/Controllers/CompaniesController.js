const express = require('express');
const router = express.Router();
const CompaniesModel = require("../Models/Companies")
const UserModel = require("../Models/Users")
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

router.post('/company', async (req, res) => {
    try {
        const { companyName, companyType, companyPhone, companyEmail, companyAddress, studentID } = req.body;

        const newCompany = await CompaniesModel.create({
            companyName,
            companyType,
            companyPhone,
            companyEmail,
            companyAddress,
            studentID
        });

        res.status(201).send({ message: "Success", newCompany });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/company/:studentID', authenticateToken, async (req, res) => {
    try {
        const companyData = await CompaniesModel.findOne({ where: { studentID: req.params.studentID } });
        if (!companyData) return res.status(404).send({ message: 'User not found' });

        res.send(companyData);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



module.exports = router;
