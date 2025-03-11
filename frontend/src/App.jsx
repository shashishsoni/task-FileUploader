import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Function to fetch uploaded files
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('https://task-fileuploader.onrender.com/api/files');
      setUploadedFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!file) {
      setStatus("Please select a file");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('myfile', file);

    try {
      const response = await axios.post('https://task-fileuploader.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setStatus('File uploaded successfully!');
      setUploadedFile(response.data.file);
      setFile(null);
      e.target.reset();
      
      // Refresh the file list after upload
      fetchUploadedFiles();
    } catch (error) {
      setStatus(error.response?.data?.message || "Error uploading file");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="upload-container" style={{ padding: '20px' }}>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !file}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
      {status && (
        <p className={status.includes('successfully') ? 'success' : 'error'}>
          {status}
        </p>
      )}
      
      {/* Display the recently uploaded file */}
      {uploadedFile && (
        <div className="uploaded-file">
          <h3>Recently Uploaded:</h3>
          <div className="file-item">
            <p>{uploadedFile.split('/').pop()}</p>
          </div>
        </div>
      )}
      
      {/* Display all uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="all-files">
          <h3>All Uploaded Files:</h3>
          <ul className="file-list">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="file-item">
                <p>{typeof file === 'string' ? file.split('/').pop() : file.filename}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
