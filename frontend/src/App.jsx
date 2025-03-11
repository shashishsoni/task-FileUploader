import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setStatus('File uploaded successfully!');
      setFile(null);
      e.target.reset();
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
    </div>
  )
}

export default App
