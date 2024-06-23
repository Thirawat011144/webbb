const express = require("express");
const bcrypt = require('bcryptjs');
const UsersModel = require("../Models/Users");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const existingUser = await UsersModel.findOne({
      where: { userName: req.body.userName },
    });
    if (existingUser) {
      res.status(400).send({ message: "Username already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const result = await UsersModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: hashedPassword,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        year: req.body.year,
        branch: req.body.branch,
        status: req.body.status,
        studentID: req.body.studentID,
      });
      await result.save();
      res.json({ message: "Success", result: result });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
})

module.exports = router;