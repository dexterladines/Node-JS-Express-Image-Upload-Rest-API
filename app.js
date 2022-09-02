const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

app.use(bodyParser.json());

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    }, 
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let upload = multer({ storage: storage });

//Create New Item
app.post('/api/image-upload', upload.single('image'), (req, res) => {
    const image = req.image;
    res.send(apiResponse({ message: 'File Uploaded Successfully.', image }));
});

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

