const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersModel = require("../Models/Users");
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const User = await UsersModel.findOne({
            where: {
                userName: req.body.userName
            },
        });

        if (!User) {
            return res.status(400).json({ message: "Username or Password Invalid" });
        }
        const isMatch = await bcrypt.compare(req.body.password, User.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Username or Password Invalid" });
        }

        const data = {
            userName: User.userName,
            role: User.role,
            firstName:User.firstName
        };

        jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                throw error;
            }
            res.json({ token, data, message: "Success" });
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})



module.exports = router;