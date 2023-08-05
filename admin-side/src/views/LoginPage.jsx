import React, { useState } from 'react';
import LogoKlontongMart from '../assets/klontong-mart.png';
import KlontongLogin from '../assets/klontong-mart.jpg';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/actionCreator';

export default function LoginPage() {
  const MySwal = withReactContent(Swal);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const henddlerFormInput = (e) => {
    const newLoginForm = {
      ...loginForm,
      [e.target.name]: e.target.value
    };
    setLoginForm(newLoginForm);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const henddlerLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginForm));
      const Toast = MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', MySwal.stopTimer);
          toast.addEventListener('mouseleave', MySwal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      });

      navigate('/');
    } catch (error) {
      const Toast = MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', MySwal.stopTimer);
          toast.addEventListener('mouseleave', MySwal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'error',
        title: error
      });
    }
  };

  return (
    <>
      <div className="container-custom-login">
        <div className="myform">
          <form onSubmit={henddlerLogin}>
            <img className="wave" width={200} style={{ marginLeft: "20px", marginBottom: "50px" }} src={LogoKlontongMart} alt="LogoHermes" />
            <h2>SIGN IN</h2>
            <h6>Please enter your login and password!</h6>
            <input value={loginForm.email} onChange={henddlerFormInput} name="email" type="text" placeholder="Admin Email" />
            <input value={loginForm.password} onChange={henddlerFormInput} name="password" type="password" placeholder="Password" />
            <button type="submit">LOGIN</button>
            <h6 style={{ marginTop: "20px" }}>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </h6>
          </form>
        </div>
        <div className="image">
          <img src={KlontongLogin} alt="KlontongLogin" />
        </div>
      </div>
    </>
  );
}
