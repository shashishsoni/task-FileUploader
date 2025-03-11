const express = require('express');
const app = express();
const uploadrouter = require('./uploadroute');
const cors = require("cors");
const http = require('http');

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://task-fileuploader.onrender.com',
    'https://task-file-uploader.vercel.app'
];

// CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

app.use(express.json());
app.use('/api', uploadrouter);

// Create HTTP server
const server = http.createServer(app);

// Configure server timeouts
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds

// Get port from environment variable or use default
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Error handling for server
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

// Start server
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

app.use(('/', (req, res) => {
    res.send('backend is running');
}));
