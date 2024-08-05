const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const notes = {};

app.post('/upload', upload.single('file'), (req, res) => {
    const { classId } = req.body;
    if (!notes[classId]) {
        notes[classId] = [];
    }

    const fileInfo = {
        originalName: req.file.originalname,
        path: req.file.path,
    };

    notes[classId].push(fileInfo);

    res.json({ message: 'File uploaded successfully', fileInfo });
});

app.get('/notes/:classId', (req, res) => {
    const classId = req.params.classId;
    res.json(notes[classId] || []);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
