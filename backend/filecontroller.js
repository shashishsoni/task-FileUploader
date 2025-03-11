const multer = require("multer");
const path = require("path");

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