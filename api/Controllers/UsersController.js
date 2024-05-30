const express = require("express");
// const UsersModel = require("../Models/Users");
const { CompaniesModel, UsersModel } = require("../Models/index");
const { Op } = require('sequelize');


const router = express.Router();


router.get("/users", async (req, res) => {
    try {
        const users = await UsersModel.findAll({
            attributes: { exclude: ['password'] }, // ระบุฟิลด์ที่ไม่ต้องการรวมในผลลัพธ์
            include: [{
                model: CompaniesModel,
                as: 'companyDetails',
                attributes: ['companyName'] // รวมเฉพาะฟิลด์ companyName
            }] 
        });
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        const user = await UsersModel.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


router.get("/users/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Query parameter is required" });
        }

        // แยก query ออกเป็นคำตามช่องว่าง
        const terms = query.split(' ');

        // สร้างเงื่อนไขการค้นหา
        let whereClause = {
            [Op.or]: [
                { firstName: { [Op.like]: `%${query}%` } },
                { lastName: { [Op.like]: `%${query}%` } },
                { userName: { [Op.like]: `%${query}%` } },
                { company: { [Op.like]: `%${query}%` } },
            ]
        };

        // ถ้ามีสองคำ แสดงว่าเป็นชื่อและนามสกุล
        if (terms.length === 2) {
            const [firstName, lastName] = terms;
            whereClause = {
                [Op.and]: [
                    { firstName: { [Op.like]: `%${firstName}%` } },
                    { lastName: { [Op.like]: `%${lastName}%` } }
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
        const { firstName, lastName, userName, password, phoneNumber, gender, year, branch, status, studentID, company } = req.body;
        Object.assign(user, { firstName, lastName, userName, password, phoneNumber, gender, year, branch, status, studentID, company })
        await user.save();
        res.json({ data: user, message: "Success" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await UsersModel.findByPk(req.params.id, {
            include: [{ model: CompaniesModel, as: 'companyDetails' }]
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        if (user.companyDetails) {
            await user.companyDetails.destroy();
        }

        await user.destroy();
        res.send({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.get('/user/info', async (req, res) => {
    try {

        res.send("test")

    } catch (error) {
        res.status(500).send({ message: error })
        console.log(error)
    }
})


module.exports = router;