const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Folder for the text files
const folderPath = path.join(__dirname, 'textFiles');

// Ensure the folder exists
fs.mkdirSync(folderPath, { recursive: true });

// Endpoint to create a text file
app.post('/api/create-file', (req, res) => {
  const fileName = `${new Date().toISOString().replace(/:/g, '-')}.txt`;
  const filePath = path.join(folderPath, fileName);
  fs.writeFile(filePath, new Date().toString(), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).send('Error writing file');
    } else {
      res.send('File created successfully');
    }
  });
});

// Endpoint to retrieve all text files
app.get('/api/files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).send('Error reading directory');
    } else {
      res.json({ files });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
