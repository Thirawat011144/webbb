const express = require("express");
const { Op, Sequelize } = require('sequelize');
const { UsersModel, CompaniesModel, CollegesModel } = require("../Models/index");
// const authenticateToken = require('../Middleware/Authorization');

const router = express.Router();

router.get("/users", async (req, res) => {
    try {
        const users = await UsersModel.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: CompaniesModel,
                    as: 'companyDetails',
                    // attributes: ['companyName']
                },
                {
                    model: CollegesModel,
                    as: 'collegeDetails',
                    // attributes: ['collegeName']
                }
            ]
        });
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        const user = await UsersModel.findByPk(req.params.id, {
            include: [
                {
                    model: CompaniesModel,
                    as: 'companyDetails'
                },
                {
                    model: CollegesModel,
                    as: 'collegeDetails'
                }
            ]
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


router.get("/users/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Query parameter is required" });
        }

        const terms = query.split(' ');

        let whereClause = {
            [Op.or]: [
                { firstName: { [Op.like]: `%${query}%` } },
                { lastName: { [Op.like]: `%${query}%` } },
                { userName: { [Op.like]: `%${query}%` } },
                { year: { [Op.like]: `%${query}%` } },
                { studentID: { [Op.like]: `%${query}%` } },

                //สร้างเงื่อนไขยังไม่ครบ
            ]
        };
        // ถ้ามีสองคำ แสดงว่าเป็นชื่อและนามสกุล
        if (terms.length === 2) {
            const [firstName, lastName] = terms;
            whereClause = {
                [Op.or]: [
                    {
                        [Op.and]: [
                            { firstName: { [Op.like]: `%${firstName}%` } },
                            { lastName: { [Op.like]: `%${lastName}%` } },
                        ]
                    },
                    { year: { [Op.like]: `%${query}%` } },
                ]
            };
        }

        const users = await UsersModel.findAll({
            where: whereClause
        });

        if (users.length === 0) {
            return res.status(404).send({ message: "No users found" });
        }

        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.put('/user/:id', async (req, res) => {
    try {
        const user = await UsersModel.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const { firstName, lastName, userName, password, phoneNumber, gender, year, branch, status, studentID, role } = req.body;
        Object.assign(user, { firstName, lastName, userName, password, phoneNumber, gender, year, branch, status, studentID, role })
        await user.save();
        
        res.json({ data: user, message: "Success" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


router.delete('/users/:id', async (req, res) => {
    try {
        const user = await UsersModel.findByPk(req.params.id);
        const studentID = (user.dataValues.studentID);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        await CompaniesModel.destroy({ where: { studentID: studentID } });
        await user.destroy();

        res.send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


module.exports = router;