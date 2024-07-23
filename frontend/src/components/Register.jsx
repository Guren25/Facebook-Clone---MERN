import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authslice';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="username" value={formData.username} onChange={onChange} />
      <input type="email" name="email" value={formData.email} onChange={onChange} />
      <input type="password" name="password" value={formData.password} onChange={onChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
