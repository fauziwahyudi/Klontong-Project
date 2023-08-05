import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import HermesLogin from '../assets/hermeslogin.jpg'
import { Link } from 'react-router-dom';
import { registerUser } from '../store/actions/actionCreator';
import { useNavigate, } from "react-router"

export default function RegisterPage() {
    const initialState = {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
    }

    const [registerForm, setFormRegister] = useState(initialState)
    // console.log(registerForm, ">>>>>>>>>>>>>");

    const handdleForm = (e) => {
        const newForm = {
            ...registerForm,
            [e.target.name]: e.target.value,
        }
        setFormRegister(newForm)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)
    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        try {
            await dispatch(registerUser(registerForm))
            MySwal.fire({
                icon: 'success',
                title: 'Successful Account Created',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/login')

        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: error,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <>
        <div className="container-custom-login">
                <div className="myform">
                    <form onSubmit={handleSubmitRegister}>
                        <h2>SIGN UP</h2>
                        <input name="username" onChange={handdleForm} value={registerForm.username} type="text" placeholder="Username" />
                        <input name="email" onChange={handdleForm} value={registerForm.email} type="email" placeholder="Email" />
                        <input name="password" onChange={handdleForm} value={registerForm.password} type="password" placeholder="Password" />
                        <input name="phoneNumber" onChange={handdleForm} value={registerForm.phoneNumber} type="text" placeholder="Phone Number" />
                        <input name="address" onChange={handdleForm} value={registerForm.address} type="text" placeholder="Address" />
                        <button type="submit">REGISTER</button>
                        <h6 style={{ marginTop: "20px" }}>
                            You have an account? <Link to="/login">Sign In</Link>
                        </h6>
                    </form>
                </div>
                <div className="image">
                    <img src={HermesLogin} />
                </div>
            </div>
        </>
    )
}