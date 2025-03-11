# File Upload System

A full-stack file upload application built with React and Node.js that allows users to upload files securely and view uploaded files.

## Features

- 🚀 Fast and efficient file uploads
- 🔒 Secure file handling
- 💫 Real-time upload status
- 🎨 Modern and responsive UI
- ⚡ Progress feedback
- 🛡️ Error handling
- 📋 Display of uploaded files

## Tech Stack

### Frontend
- React
- Axios
- Vite
- CSS3

### Backend
- Node.js
- Express
- Multer
- CORS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd file-upload-system
```

2. Install Backend Dependencies:
```bash
cd backend
npm install
```

3. Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```

## Configuration

1. Backend Configuration:
   - Create an `uploads` folder in the backend directory
   - The server runs on port 3000 by default

2. Frontend Configuration:
   - The frontend runs on port 5173 by default (Vite)
   - API endpoint is configured to automatically use the correct URL based on the environment

## Running the Application

1. Start the Backend Server:
```bash
cd backend
npm run dev
```

2. Start the Frontend Development Server:
```bash
cd frontend
npm run dev
```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Usage

1. Open the application in your browser
2. Click the "Choose File" button to select a file
3. Click "Upload" to start the upload process
4. Wait for the upload to complete
5. View the success/error message
6. See your uploaded file in the "Recently Uploaded" section
7. All previously uploaded files appear in the "All Uploaded Files" section

## Project Structure

```
file-upload-system/
├── backend/
│   ├── uploads/           # Upload directory
│   ├── server.js          # Main server file
│   ├── filecontroller.js  # File handling logic
│   ├── uploadroute.js     # Upload routes
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx       # Main React component
    │   ├── App.css       # Styles
    │   └── main.jsx      # Entry point
    ├── index.html
    └── package.json
```

## API Endpoints

### POST /api/upload
- Uploads a single file
- Request: multipart/form-data
- Field name: `myfile`
- Returns: JSON with upload status and file path

### GET /api/files
- Retrieves a list of all uploaded files
- Returns: JSON array of filenames

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the maintainers. 