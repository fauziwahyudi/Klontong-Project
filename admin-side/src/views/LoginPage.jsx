import React, { useState } from 'react';
import styled from 'styled-components';
import LogoKlontongMart from '../assets/klontong-mart.png';
import KlontongLogin from '../assets/klontong-mart.jpg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/actionCreator';

export default function LoginPage() {
  const MySwal = withReactContent(Swal);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const henddlerFormInput = (e) => {
    const newLoginForm = {
      ...loginForm,
      [e.target.name]: e.target.value,
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
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
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
        },
      });

      Toast.fire({
        icon: 'error',
        title: error.toString(),
      });
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={henddlerLogin}>
        <LoginImage>
          <img src={KlontongLogin} alt="KlontongLogin" />
        </LoginImage>
        <img
          className="wave"
          width={200}
          style={{ marginLeft: '20px', marginBottom: '50px' }}
          src={LogoKlontongMart}
          alt="LogoHermes"
        />
        <h2>SIGN IN</h2>
        <h6>Please enter your login and password!</h6>
        <input
          value={loginForm.email}
          onChange={henddlerFormInput}
          name="email"
          type="text"
          placeholder="Admin Email"
        />
        <input
          value={loginForm.password}
          onChange={henddlerFormInput}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">LOGIN</button>
        <SignUpLink>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </SignUpLink>
      </LoginForm>
    </LoginPageContainer>
  );
}

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #e8edf2;
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 30px;
  box-shadow: 0 50px 50px -50px darkslategray;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;

  h2 {
    color: #333366;
    margin-bottom: 20px;
  }

  h6 {
    text-align: left;
    margin-bottom: 15px; 
  }

  input {
    border: none;
    outline: none;
    border-radius: 0;
    width: 40%;
    border-bottom: 2px solid #1c1c1e;
    margin-bottom: 15px; 
    padding: 7px 0;
    font-size: 14px;
  }

  button {
    color: white;
    background-color: #333366;
    border: none;
    outline: none;
    border-radius: 2px;
    font-size: 14px;
    padding: 5px 12px;
    font-weight: 500;
    cursor: pointer;
    width: 20%; /* Updated to occupy the full width of the form */
    margin-top: 15px; /* Adjusted the margin for better spacing */
  }
`;

const LoginImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 45%;
  overflow: hidden;

  img {
    width: 100%;
    max-width: 300px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SignUpLink = styled.h6`
  margin-top: 20px;
`;
