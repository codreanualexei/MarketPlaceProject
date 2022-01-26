import React, {useContext} from "react";
import { BoxContainer, FormContainer, Input, MutedLink, BoldLink, SubmitButton } from "./commonElements";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);
    return <BoxContainer>
        <FormContainer>
            <Input type='email' placeholder='Email' />
            <Input type='password' placeholder='Password' />
            <SubmitButton type='submit'>Sign In</SubmitButton>
            <MutedLink href='#' className='forgotPasswordLink'>Forgot your password?</MutedLink>
            <MutedLink href="#">Don't have an account?{" "}
            <BoldLink href="#" onClick={switchToSignup} >Sing Up</BoldLink>
            </MutedLink>
        </FormContainer>
    </BoxContainer>
}