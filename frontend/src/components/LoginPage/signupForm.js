import React, {useContext} from "react";
import { BoxContainer, FormContainer, Input, MutedLink, BoldLink, SubmitButton } from "./commonElements";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
    const { switchToSignin } = useContext(AccountContext);
    return <BoxContainer>
        <FormContainer>
            <Input type='text' placeholder='First Name' />
            <Input type='text' placeholder='Last Name' />
            <Input type='email' placeholder='Email' />
            <Input type='password' placeholder='Password' />
            <SubmitButton type='submit'>Create Account</SubmitButton>
            <MutedLink href="#">Already have an account?{" "}
            <BoldLink href="#" onClick={switchToSignin}>Log In</BoldLink>
            </MutedLink>
        </FormContainer>
    </BoxContainer>
}