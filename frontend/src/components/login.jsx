import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authslice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" value={formData.email} onChange={onChange} />
      <input type="password" name="password" value={formData.password} onChange={onChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
