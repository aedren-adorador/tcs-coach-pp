import { React } from "react";
import { useLocation } from "react-router-dom";
import EmailInput from "./auth-subcomponents/main-auth/EmailInput";
import PasswordInput from "./auth-subcomponents/main-auth/PasswordInput";
import CreateAccount from "./auth-subcomponents/main-auth/CreateAccountButton";
import LoginButton from "./auth-subcomponents/main-auth/LogInButton";
import './auth-styles/auth.styles.css'

function Login() {
    return (   
        <>
        <div className='auth-big-container'>
            <div id='auth-email-and-password-container'>
                <EmailInput/>
                <PasswordInput/>
                <CreateAccount/>
                <LoginButton/>
            </div>
        </div>
        </>
    )
}

export default Login;