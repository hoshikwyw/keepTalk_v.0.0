import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/register', form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register
