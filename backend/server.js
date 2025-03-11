const express = require('express')
const app = express();
const uploadrouter = require('./uploadroute');
const cors = require("cors")

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173'
]

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(('/', (req, res) => {
    res.send('backend is running');
}));
