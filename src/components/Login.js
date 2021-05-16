import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState({
      credentials: {
          username: "",
          password: ""
      },
      error: ""
  })

  const handleChange = e => {
      setState({...state, credentials: {
          ...state.credentials, [e.target.name] : e.target.value
      }})
  }

  const { push } = useHistory();

  const submitForm = e => {
      e.preventDefault();
      axios.post("http://localhost:5000/api/login", state.credentials)
        .then(res => {
            console.log(res);
            localStorage.setItem("authToken", res.data.payload);
            push("/bubble-page");
        })
        .catch(res => {
            console.log(res);
            setState({...state, error: res.message})
        })
  }
 
  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });
  
  const error = state.error;
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={submitForm}>
            <label htmlFor="username">Username: 
                <input name="username" value={state.credentials.username} onChange={handleChange} data-testid="username"/>
            </label>
            <label htmlFor="password">Password: 
                <input name="password" value={state.credentials.password} onChange={handleChange} data-testid="password"/>
            </label>
            <button>Login</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.