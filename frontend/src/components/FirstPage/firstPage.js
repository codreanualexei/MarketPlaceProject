import './firstPage.css'
import React  from 'react';
import Login from './login';
import CreateAccount from './createAccount';




class FirstPage extends React.Component {

    

    loginFunction() {
        var x = document.getElementById("log");
        x.style.display = "block";
        var y = document.getElementById("account");
        y.style.display = "none";
    }
    createAccountFunction() {
        var x = document.getElementById("log");
        x.style.display = "none";
        var y = document.getElementById("account");
        y.style.display = "block";
    }

    render() {
        
        return(
            
            <section className='firstPage'>
                <section className='title'>
                    <h1>Welcome to Market!</h1>
                </section>
                <section className='login'>
                    <div className ='loginBox'>
                    <div className='buttons'>
                        <button className='button' onClick={this.loginFunction}>Log In</button>
                        <button className='button' onClick={ this.createAccountFunction }>Create Account</button>
                        <div id='log'>
                            <Login/>
                        </div>
                        <div id='account'>
                            <CreateAccount/>
                        </div>
                        
                    </div>
                    </div>
                </section>
                <section className='guest'>
                <h3>Use as guest</h3>

                </section>
            </section>
            
        )
      }
}
export default FirstPage;