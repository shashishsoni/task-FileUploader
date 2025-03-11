# Error Resolution Documentation

This document outlines the common issues encountered during the development of the File Upload System and their solutions.

## Table of Contents
1. [CORS Issues](#cors-issues)
2. [File Upload Errors](#file-upload-errors)
3. [Frontend State Management](#frontend-state-management)
4. [Server Configuration](#server-configuration)
5. [Security Concerns](#security-concerns)
6. [502 Bad Gateway Error](#502-bad-gateway-error)

## CORS Issues

### Problem Description
Cross-Origin Resource Sharing (CORS) errors prevented the frontend from communicating with the backend server.

### Symptoms
- Failed API requests
- Console errors mentioning "Access-Control-Allow-Origin"
- Blocked requests in browser network tab

### Solution
1. Implemented proper CORS configuration in `server.js`:
```javascript
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173'
];

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
```

## File Upload Errors

### Problem Description
File uploads were failing due to improper error handling and missing validations.

### Symptoms
- Undefined file errors
- Missing response messages
- Incomplete error handling

### Solution
1. Enhanced file controller with proper error handling:
```javascript
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
```

## Frontend State Management

### Problem Description
Inconsistent state updates and lack of loading indicators led to poor user experience.

### Symptoms
- No loading feedback during upload
- Stale state after upload
- Missing error messages

### Solution
1. Implemented comprehensive state management:
```javascript
const [file, setFile] = useState(null);
const [status, setStatus] = useState('');
const [loading, setLoading] = useState(false);

const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // Upload logic
    } catch (error) {
        setStatus(error.response?.data?.message || "Error uploading file");
    } finally {
        setLoading(false);
    }
};
```

## Best Practices Implemented

1. **Error Handling**
   - Consistent error response format
   - Proper HTTP status codes
   - Detailed error messages


2. **Code Organization**
   - Separated concerns
   - Modular components
   - Clean code practices

## Preventive Measures

To prevent these issues in future development:

1. Always implement proper CORS configuration from the start
2. Implement comprehensive error handling
3. Add proper loading states
4. Follow security best practices
5. Use environment variables for configuration
6. Implement proper logging

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [React File Upload Best Practices](https://react.dev/)
- [CORS Configuration Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 502 Bad Gateway Error

### Problem Description
The application was experiencing 502 Bad Gateway errors due to misconfigured server settings and timeout issues.

### Symptoms
- 502 Bad Gateway errors
- Connection reset by peer errors
- Intermittent timeouts
- Worker timeout warnings

### Solution
1. Updated server configuration in `server.js` to handle timeouts and proper host binding:
```javascript
const http = require('http');
const server = http.createServer(app);

// Configure server timeouts
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds

// Get port from environment variable or use default
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
```

### Key Changes Made
1. **Host Binding**
   - Bound the server to `0.0.0.0` instead of localhost
   - Allows connections from any network interface

2. **Timeout Configuration**
   - Increased `keepAliveTimeout` to 120 seconds
   - Increased `headersTimeout` to 120 seconds
   - Prevents premature connection termination

3. **Error Handling**
   - Added proper error handling for server startup issues
   - Handles port conflicts and permission issues

4. **Environment Variables**
   - Made port configurable via environment variable
   - Falls back to default port 3000 if not specified

### Prevention
To prevent 502 errors in the future:
1. Always bind to `0.0.0.0` in production environments
2. Configure appropriate timeout values based on your application needs
3. Use environment variables for port configuration
4. Implement proper error handling for server startup
5. Monitor server logs for timeout warnings 