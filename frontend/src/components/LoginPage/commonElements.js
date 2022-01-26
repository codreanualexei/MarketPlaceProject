import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MutedLink = styled.a`
  font-size: 12px;
  color: rgba(97,97,97,1);
  text-decoration: none;
  font-family: 'Poppins';
  font-weight: 600;
  margin-left:auto;
  margin-right: auto;
`;

export const BoldLink = styled.a`
  font-size: 13px;
  color: rgba(42,84,76,1);
  font-weight: 700;
  font-family: 'Poppins';
  text-decoration: none;
  margin: 0 4px;
  margin-left:auto;
  margin-right: auto;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 80%;
  margin: auto;
  margin-bottom: 1.5vh;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 15px;
  font-family: 'Poppins';
  font-weight: 700;
  color: white;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
    font-family: 'Poppins';
    font-size: 12px;
    font-weight: 500;
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgba(60,121,110,1);
  }
`;

export const SubmitButton = styled.button`
  width: 90%;
  padding: 2vh;
  margin:auto;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background-color: rgb(102, 155, 143, 1);
    color: rgb(247, 243, 233);
  &:hover {
    filter: brightness(1.03);
  }
`;