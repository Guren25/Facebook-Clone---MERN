const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('./auth');
const Post = require('../models/Post');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/', auth, upload.array('images', 4), async (req, res) => {
    const {description} = req.body;

    try {
        const images = await Promise.all(
            req.files.map(async (file) => {
                const resize = await sharp(file.buffer)
                    .resize({ width: 800 })
                    .toBuffer();
                return resize.toString('base64');
            })
        )
        const newPost = new Post ({
            description,
            images,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;