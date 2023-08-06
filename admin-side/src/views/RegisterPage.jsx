import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LogoKlontongMart from '../assets/klontong-mart.png';
import KlontongLogin from '../assets/klontong-mart.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/actions/actionCreator';

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #e8edf2;
`;

const RegisterForm = styled.form`
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

  input {
    border: none;
    outline: none;
    border-radius: 0;
    width: 55%;
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
    width: 30%;
    margin-top: 15px;
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

export default function RegisterPage() {
  const MySwal = withReactContent(Swal);

  const initialState = {
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  };

  const [registerForm, setFormRegister] = useState(initialState);

  const handdleForm = (e) => {
    const newForm = {
      ...registerForm,
      [e.target.name]: e.target.value,
    };
    setFormRegister(newForm);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(registerForm));
      MySwal.fire({
        icon: 'success',
        title: 'Successful Account Created',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/login');
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: error.toString(),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <RegisterPageContainer>
      <RegisterForm onSubmit={handleSubmitRegister}>
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
        <h2>SIGN UP</h2>
        <input
          name="username"
          onChange={handdleForm}
          value={registerForm.username}
          type="text"
          placeholder="Username"
        />
        <input
          name="email"
          onChange={handdleForm}
          value={registerForm.email}
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={handdleForm}
          value={registerForm.password}
          type="password"
          placeholder="Password"
        />
        <input
          name="phoneNumber"
          onChange={handdleForm}
          value={registerForm.phoneNumber}
          type="text"
          placeholder="Phone Number"
        />
        <input
          name="address"
          onChange={handdleForm}
          value={registerForm.address}
          type="text"
          placeholder="Address"
        />
        <button type="submit">REGISTER</button>
        <SignUpLink>
          You have an account? <Link to="/login">Sign In</Link>
        </SignUpLink>
      </RegisterForm>
    </RegisterPageContainer>
  );
}
