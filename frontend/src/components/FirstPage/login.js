import React, { Component } from "react";
import './login.css'
class Login extends Component {

  render() {
    return (
        <div className='loginDiv'>
            <div className='field'>
            <label htmlFor="emailAddress">Email Address:</label>
            <input type="text" id="emailAddress" name="emailAddress"/>
            </div>
            <div className='field'>
            <label htmlFor='pwd'>Password:</label>
            <input type='password' id='pwd' name='pwd'/>
            </div>
            <button className='formButton'>Submit</button>
            <button className='forgotPasswordBtn'>Forgot Password?</button>
        </div>
    )
  }
}

export default Login;