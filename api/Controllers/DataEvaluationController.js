const express = require("express");
const DataEvaluation = require("../Models/DataEvaluation");

const router = express.Router();

router.post("/data-evaluation", async (req, res) => {
    try {
        const { evaluatorName, studentId, criteria,time,evaluatorStatus } = req.body;

        const newEvaluation = await DataEvaluation.create({
         
            evaluatorName: evaluatorName,
            studentId: studentId,
            criteria: criteria,
            time:time,
            evaluatorStatus:evaluatorStatus
        });

        await newEvaluation.save();
        res.json({ message: "Success", result: newEvaluation });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับดึงข้อมูลการประเมินทั้งหมด
router.get("/data-evaluation", async (req, res) => {
    try {
        const evaluations = await DataEvaluation.findAll();
        res.json(evaluations);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับดึงข้อมูลการประเมินของนักเรียนคนเดียวโดยใช้ studentId
router.get("/data-evaluation/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const evaluation = await DataEvaluation.findAll({ where: { studentId: studentId } });

        if (evaluation) {
            res.json(evaluation);
        } else {
            res.status(404).send({ message: "Evaluation not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับลบข้อมูลการประเมินโดยใช้ studentId
router.delete("/data-evaluation", async (req, res) => {
    try {
        const { studentID } = req.body; // ตรวจสอบชื่อฟิลด์ให้ตรงกัน

        const result = await DataEvaluation.destroy({
            where: { studentId: studentID } // ใช้ studentID
        });

        if (result) {
            res.json({ message: "Evaluations deleted successfully" });
        } else {
            res.status(404).send({ message: "Evaluations not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;
