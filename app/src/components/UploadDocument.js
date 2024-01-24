import React, { useState } from "react";
import axios from 'axios';

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const upload = () => {

    // const user = localStorage.getItem('user');
    // const userId=JSON.parse(user).userId
    // console.log("user id in upload "+userId)

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      axios.post('http://localhost:4000/upload', formData)
        .then(res => {
          console.log("uploaded");
          setUploadStatus('File uploaded successfully');
          alert("uploaded")
          setFile(null);
        })
        .catch(err => {
          console.log(err);
          setUploadStatus('Failed to upload file');
        });
    } else {
      setUploadStatus('Please select a file');
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Upload a Document</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <br />
      <button onClick={upload}>Upload</button>
      <br />
      <p style={{ color: uploadStatus.includes('Failed') ? 'red' : 'green' }}>{uploadStatus}</p>
    </div>
  );
}

export default UploadDocument;
