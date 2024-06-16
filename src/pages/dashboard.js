import React, { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import $ from 'jquery';
import './dashboard.scss';

import DragNdrop from "../components/DragNdrop";

export default function Dashboard() 
{
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  const token = sessionStorage.getItem('token');

  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");

  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    if (isAuthenticated && token) {
      $.ajax({
        type: "POST",
        url: 'http://localhost/webologyTaskPHP/backend/getUserInfo.php',
        data: {token},
        success(data) 
        {
          setResult(data);
          if (data.success)
          {
            setUsername(data.username);
            setFiles(data.files || []);
          }
          else
          {
            console.error('Failed to fetch user info:', data.message);
          }
        },
        error(xhr, status, error) {
          console.error('AJAX error:', status, error);
        }
      });
    }
  }, [isAuthenticated, token]);

  const handleFileChange = (event) => 
  {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () =>
  {
    if(file)
    {
      const formData = new FormData;
      formData.append('file', file);
      formData.append('token', token);
      formData.append('username', username);

      $.ajax({

          type: "POST",
          url: 'http://localhost/webologyTaskPHP/backend/uploadFile.php',
          data: formData,
          contentType: false,
          processData: false,

          success(data) {
            if (data.success) 
            {
              setFiles([...files, { file_name: file.name, file_path: `storage/${file.name}` }]);
              setFile(null);
            } 
            else 
            {
              console.error('File upload error:', data.message);
            }
          },
          error(xhr, status, error) {
            console.error('AJAX error:', status, error);
          }

      });

    }
  }

  const updateFilesList = (newFiles) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  //preventing files from downloading and not downloading
  const downloadFile = (path) =>
  {
    const fileName = path.split(".").pop();
    console.log(fileName);
    const aTag = document.createElement("a");
    aTag.href = path;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }

  //

  if (!isAuthenticated) 
  {
    return <Navigate to="/login"/>;
  }


  // layout
  return(
    <>

      <div className='header'>
        <h1>Hello <strong> {username} </strong>, welcome to your dashboard!</h1>
      </div>
      
      <div className='filesBrowser'>
        <h2>Your files: </h2>
        
        {/* <DragNdrop token={token} username={username} updateFilesList={updateFilesList} /> */}

        {/* <div className='addNewFile'>
          <input className='browse' type="file" onChange={handleFileChange} />
          <button className='upload' onClick={handleFileUpload}>Upload</button>
        </div> */}

        <DragNdrop token={token} username={username} updateFilesList={updateFilesList} />




        <div className='documentList'>
          <ul>
            {files.length === 0 ? (
              <li>No files</li>
            ) : (
              files.map((file, index) => (
                <li className='documentLine' key={index}>
                  <button onClick={()=>downloadFile(file.file_name)}>{file.file_name}</button>
                </li>
              ))
            )}
          </ul>
        </div>

      </div>
    
    </>

  );
}

