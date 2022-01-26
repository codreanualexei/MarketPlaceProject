import React, { Component } from "react";

class CreateAccount extends Component {
  render() {
    return (
    <div className='createAccountDiv'>
            <div className='field'>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName"/>
            </div>
            <div className='field'>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName"/>
            </div>
            <div className='field'>
                <label htmlFor="emailAddress">Email Address:</label>
                <input type="text" id="emailAddress" name="emailAddress"/>
            </div>
            <div className='field'>
                <label htmlFor='pwd'>Password:</label>
                <input type='password' id='pwd' name='pwd'/>
            </div>
            <div className='field'>
                <label htmlFor='pwd2'>Confirm Password:</label>
                <input type='password' id='pwd2' name='pwd2'/>
            </div>
            <button className='formButton'>Create Account</button>
            
        </div>
    )
  }
}

export default CreateAccount;