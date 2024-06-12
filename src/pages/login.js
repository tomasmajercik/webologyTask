import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import $ from "jquery";



export default function Login() 
{
  const navigate = useNavigate();
  // variables
  const [isLoggedIn, setLoggedIn] = useState(true);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [result, setResult] = useState("");

  //functions
  const handleNameChange = (ev) =>
  {
    setName(ev.target.value);
  }
  const handlePasswordChange = (ev) =>
  {
    setPassword(ev.target.value); 
  }
  const handleEmailChange = (ev) =>
  {
    setEmail(ev.target.value); 
  }

  const handleSubmit = (ev) =>
  {
    ev.preventDefault();

    const form = $(ev.target);
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data)
      {
        setResult(data);
        if(data.success)
        {
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('token', data.token);
            navigate('/dashboard');
        }
        else
        {
            setResult("We run into a problem: '" + data.message + "' sorry")
        }

      }
    });

  }
  const toggleForm = () => 
  {
    setLoggedIn(!isLoggedIn);
  };

  // layout
  return(
    <>
      <h1>
        Documents
      </h1>

      <div className="form_container">
        {isLoggedIn ? 
        (
          <div className='login_form'>
            <form action='http://localhost/webologyTaskPHP/backend/data.php' method='post' onSubmit={(event) => handleSubmit(event)}>
              <input className='nameInput' type='text' id='name' name='name' placeholder='name' value={name} onChange={(event) => handleNameChange(event)}/>
              <br/>
              <input className='passwordInput' type='password' id='password' name='password' placeholder='password' value={password} onChange={(event) => handlePasswordChange(event)}/>
              <br/>
              <p>Don't have an account? <strong className='redirect_bttn' onClick={toggleForm}>Register here</strong></p>
              <button className='submitBtn' type='submit'>Submit!</button>
            </form>
          </div>
        ) : (
          <div className='register_form'>
            <form action='http://localhost/webologyTaskPHP/backend/data.php' method='post' onSubmit={(event) => handleSubmit(event)}>
              <input className='nameInput' type='text' id='name' name='name' placeholder='name' value={name} onChange={(event) => handleNameChange(event)}/>
              <br/>
              <input className='nameInput' type='text' id='email' name='email' placeholder='email' value={email} onChange={(event) => handleEmailChange(event)}/>
              <br/>
              <input className='nameInput' type='password' id='name' name='password' placeholder='password' value={password} onChange={(event) => handlePasswordChange(event)}/>
              <br/>
              <p>Already have an account? <strong className='redirect_bttn' onClick={toggleForm}>Login here</strong></p>

              <button className='submitBtn' type='submit'>Submit!</button>
            </form>
          </div>
        )}
      </div>




    </>
  );
}