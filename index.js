const express = require('express');
const multer = require('multer');
const mammoth = require('mammoth');
const app = express();
const upload = multer();
const port = 3000;

app.post('/convert', upload.single('file'), async (req, res) => {
  try {
    const result = await mammoth.extractRawText({ buffer: req.file.buffer });
    res.json({ text: result.value });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the document', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Mammoth API listening at http://localhost:${port}`);
});
