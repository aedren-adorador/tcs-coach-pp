import { React } from "react";
import { useEffect, useState } from "react";
import EmailInput from "./auth-subcomponents/main-auth/EmailInput";
import PasswordInput from "./auth-subcomponents/main-auth/PasswordInput";
import CreateAccount from "./auth-subcomponents/main-auth/CreateAccountButton";
import LoginButton from "./auth-subcomponents/main-auth/LogInButton";
import './auth-styles/auth.styles.css'

function Login() {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        setRevealed(true);
    }, []);
    return (   
        <>
        <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
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