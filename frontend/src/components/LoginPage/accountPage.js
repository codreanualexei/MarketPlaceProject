import React, { useContext, useState } from "react";
import styled from "styled-components";
import './accountPage.css';
import { LoginForm } from "./loginForm";
import { SignupForm } from "./signupForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { useHistory } from "react-router-dom";
import { BoldLink } from "./commonElements";
import Logo from '../../../src/logo.jpeg';

const BoxContainer = styled.div`
width: 380px;
// min-height: 550px;
display: flex;
flex-direction: column;
border-radius: 19px;
box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
position: relative;
overflow: hidden;
height: 76vh;
padding-top: 2vh;
padding-bottom: 2vh;
// width: 26vw;
display: flex;
margin-left:auto;
margin-right:auto;
justify-content: center;
background-color: rgb(43, 41, 41, 0.4);
`;

const TopContainer = styled.div`
width: 100%;
height: 200px;
display: block;
flex-direction: column;
justify-content: flex-end;
padding: 0 1.8em;
padding-bottom: 5em;
text-align: left;
`;

const BackDrop = styled(motion.div)`
width: 160%;
height: 550px;
position: absolute;
display: flex;
flex-direction: column;
border-radius: 50%;
transform: rotate(25deg);
top: -330px;
left: -165px;
background: linear-gradient(90deg, rgba(204,196,198,1) 17%, rgba(143,135,137,1) 37%, rgba(138,126,127,1) 50%, rgba(94,85,87,1) 71%);
// background: linear-gradient(90deg, rgba(97,97,97,1) 41%, rgba(60,121,110,1) 80%, rgba(102,155,143,1) 100%);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 30;
  margin: 0;
  font-family: 'Poppins';
`;

const FormContainer = styled.div`
width: 100%;
display: flex;
flex-direction:column;
`;

const backdropVariants = {
    expanded: {
      width: "233%",
      height: "1050px",
      borderRadius: "20%",
      transform: "rotate(60deg)",
    },
    collapsed: {
      width: "160%",
      height: "550px",
      borderRadius: "50%",
      transform: "rotate(60deg)",
    },
};
  
const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 20,
};

export function AccountBox(props) {
    const history = useHistory();
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signIn");

    const mainPageRoute = () => {
        history.push("/main");
    }

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
          setExpanded(false);
        }, expandingTransition.duration * 1000 - 1000);
    };
    
    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
          setActive("signUp");
        }, 1000);
    };
    
    const switchToSignin = () => {
        playExpandingAnimation();
        setTimeout(() => {
          setActive("signIn");
        }, 1000);
    };
    
    const contextValue = { switchToSignup, switchToSignin };
    
    return (
            <section className='firstPage'>
                <section className='title'>
                    {/* <h1 className='marketTitle'>M A R K E T</h1> */}
                    <img className='poza' src={Logo}/>
                </section>
                <section className='login'>
                    <AccountContext.Provider value={contextValue}>
                    <BoxContainer>
                        <TopContainer>
                            <BackDrop initial={false} animate={isExpanded ? "expanded" : "collapsed"} variants={backdropVariants} transition={expandingTransition}/>
                            {active === "signIn" && (
                                <HeaderContainer>
                                <HeaderText>Welcome</HeaderText>
                                <HeaderText>Back</HeaderText>
                                </HeaderContainer>
                            )}
                            {active === "signUp" && (
                                <HeaderContainer className='signUpContainer'>
                                <HeaderText>Create</HeaderText>
                                <HeaderText>Account</HeaderText>
                                </HeaderContainer>
                            )}
                        </TopContainer>
                        <FormContainer>
                            {active === "signIn" && <LoginForm />}
                            {active === "signUp" && <SignupForm />}
                        </FormContainer>
                    </BoxContainer>
                    </AccountContext.Provider>
                </section>
                <section className='guest'>
                <BoldLink onClick={mainPageRoute} >Use as guest</BoldLink>

                </section>
            </section>
    )

}