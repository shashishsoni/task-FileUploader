const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('myfile');

exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        
        if (!req.file) {
            return res.status(400).json({ message: "No file selected" });
        }
        
        res.status(200).json({
            message: "File uploaded successfully",
            file: `uploads/${req.file.filename}`
        });
    });
};

// Get all uploaded files
exports.getFiles = (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    
    // Check if directory exists
    if (!fs.existsSync(uploadsDir)) {
        return res.status(200).json({ files: [] });
    }
    
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error reading uploads directory" });
        }
        
        // Filter out .gitkeep and any other hidden files
        const fileList = files.filter(file => !file.startsWith('.'));
        
        res.status(200).json({
            files: fileList
        });
    });
};