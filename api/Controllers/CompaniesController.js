const express = require('express');
const router = express.Router();
const CompaniesModel = require("../Models/Companies")
const authenticateToken = require('../Middleware/Authorization');

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
