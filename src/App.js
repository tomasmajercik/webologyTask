import React, { useState } from 'react';
import './App.scss';
import $ from "jquery";




function App() 
{
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
      success(data){
        setResult(data);
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
            <form action='http://localhost:8000' method='post' onSubmit={(event) => handleSubmit(event)}>
              <input type='text' id='name' name='name' placeholder='name' value={name} onChange={(event) => handleNameChange(event)}/>
              <br/>
              <input type='password' id='password' name='password' placeholder='password' value={password} onChange={(event) => handlePasswordChange(event)}/>
              <br/>
              <p>Don't have an account? <strong className='redirect_bttn' onClick={toggleForm}>Register here</strong></p>
              <button type='submit'>Submit!{name}</button>
            </form>
          </div>
        ) : (
          <div className='register_form'>
            <form action='http://localhost:8000' method='post' onSubmit={(event) => handleSubmit(event)}>
              <input type='text' id='name' name='name' placeholder='name' value={name} onChange={(event) => handleNameChange(event)}/>
              <br/>
              <input type='text' id='email' name='email' placeholder='email' value={email} onChange={(event) => handleEmailChange(event)}/>
              <br/>
              <input type='password' id='name' name='password' placeholder='password' value={password} onChange={(event) => handlePasswordChange(event)}/>
              <br/>
              <p>Already have an account? <strong className='redirect_bttn' onClick={toggleForm}>Login here</strong></p>

              <button type='submit'>Submit!</button>
            </form>
          </div>
        )}
      </div>




    </>
  );
}

export default App;
