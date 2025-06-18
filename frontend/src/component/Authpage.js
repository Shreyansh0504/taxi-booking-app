import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Authpage = ({ setNotificationMessage, setIsLoading, setUser }) => {
    const navigate = useNavigate()

    const [isLoginActive, setIsLoginActive] = useState(true)

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerName, setRegisterName] = useState('')
    const [registerPhone, setRegisterPhone] = useState('')
    const [registeredUserType, setRegisteredUserType] = useState('')

    const onLoginActive = () => {
        setIsLoginActive(true)
        document.getElementById("auth_login").style.cursor = "default"
        document.getElementById("auth_sign_up").style.cursor = "pointer"
    }

    const offLoginActive = () => {
        setIsLoginActive(false)
        document.getElementById("auth_sign_up").style.cursor = "default"
        document.getElementById("auth_login").style.cursor = "pointer"
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const uname = registerName[0].toUpperCase() + registerName.slice(1, registerName.length)
            const res = await axios.post('http://localhost:8080/api/v1/auth/register', {
                name: uname,
                email: registerEmail,
                password: registerPassword,
                phone: registerPhone,
                userType: registeredUserType
            });
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
            alert('Registeration done. Please login!');
            setRegisterEmail('')
            setRegisterName('')
            setRegisterPassword('')
            setRegisterPhone('')
        } catch (err) {
            alert('Registeration unsuccesful');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email: loginEmail,
                password: loginPassword,
            });
            if (res.data) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                setUser(res.data.user)
                navigate('/')
            }
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
            alert('Logged in!');
            setRegisterEmail('')
            setRegisterName('')
            setRegisterPassword('')
            setRegisterPhone('')
        } catch (err) {
            alert('Login unsuccesful')
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    };

    return (
        <div className='auth_container'>
            <div className="auth_container_inner">
                <div className="auth_header">
                    <div className={`auth_header_item  ${isLoginActive ? "auth_header_item_active" : ""}`} id='auth_login' onClick={onLoginActive}>Login</div>
                    <div className={`auth_header_item  ${!isLoginActive ? "auth_header_item_active" : ""}`} id='auth_sign_up' onClick={offLoginActive}>Sign Up</div>
                </div>
                <div className="auth_main" >
                    {isLoginActive && <form onSubmit={handleLogin} className="auth_form" autoComplete='off'>
                        <div className="auth_form_item">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id='email' name='email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder='abc@gmail.com' required />
                        </div>
                        <div className="auth_form_item">
                            <label htmlFor="password">Password *</label>
                            <input type="password" id='password' name='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder='******' required />
                        </div>
                        <div className="auth_form_item">
                            <button type="submit">Login</button>
                        </div>
                    </form>}
                    {!isLoginActive && <form onSubmit={handleRegister} className="auth_form" autoComplete='off'>
                        <div className="auth_form_item">
                            <label htmlFor="name">Name *</label>
                            <input type="text" id='name' name='name' value={registerName} onChange={(e) => setRegisterName(e.target.value)} placeholder='John Doe' required />
                        </div>
                        <div className="auth_form_item">
                            <label htmlFor="phone">Mobile *</label>
                            <input type="tel" id='phone' name='phone' value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} placeholder='+919876543210' required />
                        </div>
                        <div className="auth_form_item">
                            <label htmlFor="registeredUserType">User Type *</label>
                            <div className="radio_btn">
                                Customer <input type='radio' onChange={() => setRegisteredUserType('Customer')} name='registeredUserType' required />
                            </div>
                            <div className="radio_btn">
                                Rider <input type='radio' name='registeredUserType' onChange={() => setRegisteredUserType('Rider')} required />
                            </div>
                        </div>
                        <div className="auth_form_item">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id='email' name='email' value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder='abc@gmail.com' required />
                        </div>
                        <div className="auth_form_item">
                            <label htmlFor="password">Password *</label>
                            <input type="password" id='password' name='password' value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder='******' required />
                        </div>
                        <div className="auth_form_item">
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
    )
}

export default Authpage
