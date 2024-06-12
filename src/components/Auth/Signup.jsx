// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup, setLoading, setError } from '../../redux/slices/authSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector(state => state.auth);

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      dispatch(signup({ email, password }));
      history.push('/launches');
    } catch (err) {
      dispatch(setError('Signup failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignup}>
        <h2 className="text-2xl mb-4">Signup</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          className="mb-2 p-2 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="mb-2 p-2 border"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
