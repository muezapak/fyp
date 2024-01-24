'use client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import DocumentPreview from './DocumentPreview'; 
import { getDocuments } from './Functions';
import './style.css';
import  Sidebar  from './Sidebar';



function DocumentList() {
  const [documents, setDocuments] = useState([]);
  
    const [selectedDocument, setSelectedDocument] = useState(null);

    // const user = localStorage.getItem('user');
    // const userId=JSON.parse(user).userId
    // console.log("user id "+userId)
  
    async function fetchDocuments() {
      const docs = await getDocuments();
      setDocuments(docs);
    }
    useEffect(() => {
  
     fetchDocuments();
    },[]);
  

    
   
  
    const searchHandle = async (event)=>{
      let key = event.target.value;
      try
      {
          if(key){
              let result = await axios.post(`http://localhost:4000/search/${key}`,  {
                withCredentials: true, // Ensure credentials (cookies) are sent
              });
              if(result.data){
                 console.log(result.data);
                  setDocuments(result.data)
              }
          }else{
            console.log("no match")
            fetchDocuments();
          }
      }
      catch (error) {
          console.error('Error in searching:', error);
          // Handle error (e.g., show a message to the user)
        }
   
  
  }
  const handlePreview = (documentUrl) => {

    setSelectedDocument(documentUrl); // Set the selected document URL for preview"
   // console.log("url "+document.url)
   console.log("url "+documentUrl)
   console.log("selected "+selectedDocument) ;
  };
  const cardStyle = {
    width: '20rem',
  };

 return (
    <div className="container">
      <div className="flex">
        <Sidebar />
        <div className="content">
          <div className="search-container">
            <input
              type="text"
              className='search-product-box'
              placeholder='Search Product'
              onChange={searchHandle}
            />
            <button className="search-button"><i className="fa fa-search"></i></button>
          </div>

          <div className="card-container">
            {documents.map((document, index) => (
              <div className="card" style={cardStyle} key={document._id}>
                <div className="card-body">
                  <h5 className="card-title" style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                    {document.name}
                  </h5>
                  <p className="card-text">{new Date(document.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  <button onClick={() => handlePreview(document.url)} className="btn btn-primary">Preview Document </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedDocument && <DocumentPreview documentUrl={selectedDocument} />}
    </div>
  );
}

export default DocumentList;