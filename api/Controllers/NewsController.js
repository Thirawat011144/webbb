const express = require('express');
const NewsModel = require('../Models/News');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// POST เพิ่มข่าวสารพร้อมอัปโหลดไฟล์
router.post('/news', upload.fields([{ name: 'pdfFile' }, { name: 'docFile' }]), async (req, res) => {
    try {
        const { title, detail } = req.body;
        let pdfFile = '';
        let docFile = '';

        if (!title || !detail) {
            return res.status(400).send({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
        }

        // ตรวจสอบการอัปโหลดไฟล์ PDF และ DOC (ถ้ามี)
        if (req.files['pdfFile']) {
            pdfFile = req.files['pdfFile'][0].filename;
        }
        if (req.files['docFile']) {
            docFile = req.files['docFile'][0].filename;
        }

        const news = await NewsModel.create({
            title,
            detail,
            pdfFile,
            docFile,
        });

        res.status(201).send({ message: 'สร้างข่าวสารสำเร็จ', news });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// router.get('/news', async (req, res) => {
//     try {
//         const newsList = await NewsModel.findAll();
//         res.status(200).send(newsList);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

router.get('/news', async (req, res) => {
    try {
        const documents = await NewsModel.findAll();
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

        const documentsWithUrls = documents.map(doc => ({
            ...doc.toJSON(),
            pdfFile: doc.pdfFile ? baseUrl + doc.pdfFile : null,
            docFile: doc.docFile ? baseUrl + doc.docFile : null
        }));

        res.status(200).json(documentsWithUrls);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ error: "Error fetching documents" });
    }
});

// router.get("/news/:id", async (req, res) => {
//     try {
//         const news = await NewsModel.findByPk(req.params.id);
//         if (!news) {
//             return res.status(404).send({ message: "News not found" });
//         }
//         res.send(news);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// })

// GET ข่าวสารตาม ID
router.get('/news/:id', async (req, res) => {
    try {
        const news = await NewsModel.findByPk(req.params.id);
        if (!news) {
            return res.status(404).send({ message: 'News not found' });
        }
        res.send(news);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// router.put('/news/:id', async (req, res) => {
//     try {
//         const news = await NewsModel.findByPk(req.params.id);
//         if (!news) {
//             return res.status(404).send({ message: "News not found" });
//         }
//         const { title, detail, } = req.body;
//         Object.assign(news, { title, detail })
//         await news.save();
//         res.json({ data: news, message: "Success" });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// })

// router.delete('/news/:id', async (req, res) => {
//     try {
//         const news = await NewsModel.findByPk(req.params.id);
//         if (!news) {
//             return res.status(404).send({ message: "News not found" });
//         }
//         await news.destroy();
//         res.send({ message: "News deleted successfully" });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//         console.log(error)
//     }
// })

// PUT แก้ไขข่าวสารตาม ID
router.put('/news/:id', async (req, res) => {
    try {
        const news = await NewsModel.findByPk(req.params.id);
        if (!news) {
            return res.status(404).send({ message: 'News not found' });
        }

        const { title, detail } = req.body;

        // ตรวจสอบการอัปโหลดไฟล์ PDF และ DOC (ถ้ามี)
        if (req.files['pdfFile']) {
            news.pdfFile = req.files['pdfFile'][0].filename;
        }
        if (req.files['docFile']) {
            news.docFile = req.files['docFile'][0].filename;
        }

        news.title = title;
        news.detail = detail;

        await news.save();
        res.json({ data: news, message: 'Success' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// DELETE ลบข่าวสารตาม ID
router.delete('/news/:id', async (req, res) => {
    try {
        const news = await NewsModel.findByPk(req.params.id);
        if (!news) {
            return res.status(404).send({ message: 'News not found' });
        }
        await news.destroy();
        res.send({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;

// module.exports = router;
