import LoginForm from "../components/LoginForm";
import Signup from "../components/Signup";
import React, {useState} from 'react';
import styled from "styled-components";

function Login({API_URL, onLogin}){

    const [showLogin,setShowlogin] =useState(true)
    return <Wrapper>
        {showLogin ? (
            <>
                <LoginForm API_URL={API_URL} onLogin={onLogin}/>
                <Divider />
                <P>
                    Don't have an account? &nbsp;
                    <button onClick={() => setShowlogin(false)}>Sign Up</button>
                </P>
            </>
        ) : (
            <>
                <Signup API_URL={API_URL} onLogin={onLogin}/>
                <Divider />
                <P>
                    Already have an account? &nbsp;
                    <button onClick={() => setShowlogin(true)}>Login</button>
                </P>
            </>
        )}
    </Wrapper>
}

export default Login;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: deeppink;
  margin: 8px 0 16px;
`;

const Wrapper = styled.section`
  max-width: 300px;
  margin: 40px auto;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;
const P = styled.p`
color: blue;
`