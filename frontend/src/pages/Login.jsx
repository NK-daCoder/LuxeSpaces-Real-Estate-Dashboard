import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/Form';

const Login = () => {
  return (
    <AuthForm type="login" role="agent"/>
  );
}

export default Login;