import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import $ from 'jquery';

export default function Dashboard() 
{
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  const token = sessionStorage.getItem('token');

  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");

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


  if (!isAuthenticated) 
  {
    return <Navigate to="/login"/>;
  }

  // layout
  return(
    <div>
      <h1>Hello {username}, welcome to your dashboard!</h1>
      <p>your token is {token}</p>
    </div>
  );
}
