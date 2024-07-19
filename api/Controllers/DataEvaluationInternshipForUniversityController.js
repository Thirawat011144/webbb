const express = require("express");
const DataEvaluationInternshipForUniversity = require("../Models/DataEvaluationInternshipForUniversity");

const router = express.Router();

router.post("/data-evaluation-internship-university", async (req, res) => {
    try {
        const {
            evaluatorName,
            studentId,
            criteria,
            time,
            evaluatorStatus,
            hrGuidance, // เพิ่มฟิลด์นี้ใน DataEvaluationInternship model
            employeeSupport, // เพิ่มฟิลด์นี้ใน DataEvaluationInternship model
            phoneNumber
        } = req.body;

        console.log("Criteria Length:", criteria.length); // เพิ่มดีบักเพื่อดูจำนวนข้อ
        console.log("Criteria:", criteria); // เพิ่มดีบักเพื่อดูข้อมูลที่ส่งมา

        const newEvaluation = await DataEvaluationInternshipForUniversity.create({
            evaluatorName: evaluatorName,
            studentId: studentId,
            phoneNumber: phoneNumber,
            criteria: criteria,
            hrGuidance: hrGuidance, // เพิ่มฟิลด์นี้ใน DataEvaluationInternship model
            employeeSupport: employeeSupport, // เพิ่มฟิลด์นี้ใน DataEvaluationInternship model
            time: time, // เพิ่มฟิลด์นี้ใน DataEvaluationInternship model
            evaluatorStatus: evaluatorStatus, // เพิ่มฟิลด์นี้ใน DataEvaluationInternship model
        });

        res.json({ message: "Success", result: newEvaluation });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับดึงข้อมูลการประเมินทั้งหมด
router.get("/data-evaluation-internship-university", async (req, res) => {
    try {
        const evaluations = await DataEvaluationInternshipForUniversity.findAll();
        res.json(evaluations);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
