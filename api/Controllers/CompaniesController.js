const express = require('express');
const router = express.Router();
const CompaniesModel = require("../Models/Companies")

router.post('/company', async (req, res) => {
    try {
        const { companyName, companyType, companyPhone, companyEmail, companyAddress } = req.body;

        const newCompany = await CompaniesModel.create({
            companyName,
            companyType,
            companyPhone,
            companyEmail,
            companyAddress
        });

        res.status(201).send({ message: "Success", newCompany });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
