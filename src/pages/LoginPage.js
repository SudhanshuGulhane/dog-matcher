import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post('/auth/login', { name, email });
      localStorage.setItem('isLoggedIn', 'true');
      console.log('-> ', localStorage.getItem('isLoggedIn'));
      navigate('/search');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h5" mb={3}>Login</Typography>
      <TextField fullWidth label="Name" value={name} onChange={e => setName(e.target.value)} margin="normal" />
      <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Log In
      </Button>
    </Container>
  );
};

export default LoginPage;