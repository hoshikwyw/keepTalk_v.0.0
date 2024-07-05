import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/login', form);
    localStorage.setItem('token', response.data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login
