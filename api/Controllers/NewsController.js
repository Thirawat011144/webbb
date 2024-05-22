const express = require("express");
const bcrypt = require('bcryptjs');
const NewsModel = require("../Models/News");

const router = express.Router();

router.post('/news', async (req, res) => {
    try {
        const { title, detail } = req.body;

        if (!title || !detail) {
            return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }
        const news = await NewsModel.create({
            title,
            detail
        });
        res.status(201).send({ message: "สร้างข่าวสารสำเร็จ", news });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.get('/news', async (req, res) => {
    try {
        const newsList = await NewsModel.findAll();
        res.status(200).send(newsList);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get("/news/:id", async (req, res) => {
    try {
        const news = await NewsModel.findByPk(req.params.id);
        if (!news) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(news);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.put('/news/:id', async (req, res) => {
    try {
        const news = await NewsModel.findByPk(req.params.id);
        if (!news) {
            return res.status(404).send({ message: "User not found" });
        }
        const { title, detail, } = req.body;
        Object.assign(news, { title, detail })
        await news.save();
        res.json({ data: news, message: "Success" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.delete('/news/:id', async (req, res) => {
    try {
        const news = await NewsModel.findByPk(req.params.id);
        if (!news) {
            return res.status(404).send({ message: "News not found" });
        }
        await news.destroy();
        res.send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log(error)
    }
    
})



module.exports = router;
