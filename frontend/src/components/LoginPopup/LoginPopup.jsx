import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import axios from 'axios'
// import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'


const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext)

    const [currState, setCurrState] = useState('Sign Up')
    //create state variable to store user name, email, password
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(prev => ({ ...prev, [name]: value }))
    }

    const onLoginHandler = async (e) => {
        e.preventDefault() //to prevent reload
        let newUrl = url
        if (currState === 'Login') {
            newUrl += '/api/user/login'
        } else {
            newUrl += '/api/user/register'
        }

        const res = await axios.post(newUrl, data)
        if (res.data.success) {
         
            setToken(res.data.token)    //we will get a token          
            localStorage.setItem("token", res.data.token)   //save this token in local storage
            setShowLogin(false)   //hide login prompt
        } else {
            alert(res.data.message)
            // toast.error(response.data.message)
        }
    }


    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={onLoginHandler}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {
                        currState === "Login" ? <></> :
                            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    }
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p >By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {
                    currState === "Login" ?
                        <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <></>
                }
                {
                    currState === "Sign Up" ?
                        <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p> : <></>
                }
            </form>
        </div>
    )
}
export default LoginPopup
