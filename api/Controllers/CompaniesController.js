const express = require('express');
const router = express.Router();
const CompaniesModel = require("../Models/Companies")
const UserModel = require("../Models/Users")

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).send({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};

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

router.get('/company', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);
        if (!user) return res.status(404).send({ message: 'User not found' });

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
