import React, {useContext} from "react";
import { BoxContainer, FormContainer, Input, MutedLink, BoldLink, SubmitButton } from "./commonElements";
import { AccountContext } from "./accountContext";
import { useHistory } from "react-router-dom";
import axios from 'axios'
export function LoginForm(props) {

    let history = useHistory()

    async function login (e){
        e.preventDefault();

        let email = document.getElementById("email").value;
        let pass = document.getElementById("pass").value;
        console.log("elemens:",email,pass)

         axios.post('/api/login', {
            email: email,
            password: pass
          }) 
          .then(res =>{
            history.push("/api/allcommands")
          })
          .catch(err=>{
              alert("Eroare username sau parolă",err)
          })

          
    }

    const { switchToSignup } = useContext(AccountContext);
    return <BoxContainer>
        <FormContainer>
            <Input id='email' type='email' placeholder='Email' />
            <Input id='pass'type='password' placeholder='Password' />
            <SubmitButton type='submit' onClick={login}>Sign In</SubmitButton>
            <MutedLink href='#' className='forgotPasswordLink'>Forgot your password?</MutedLink>
            <MutedLink href="#">Don't have an account?{" "}
            <BoldLink href="#" onClick={switchToSignup} >Sing Up</BoldLink>
            </MutedLink>
        </FormContainer>
    </BoxContainer>
}