import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://xkmeaillvfixvvjrpdfi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrbWVhaWxsdmZpeHZ2anJwZGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0NDUwMjAsImV4cCI6MjAzODAyMTAyMH0.Z-x_y8mz6zfTmulsdMG4MkPX7LQD4MKTiRNLy55SvYc');

const Login = () => {
  const navigate = useNavigate();
  const [logemail, setEmail] = useState('');
  const [logpassword, setPassword] = useState('');
  const [errormsg, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: logemail,
        password: logpassword,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Login successful!');
        localStorage.setItem('Logged_in', JSON.stringify(data.session));
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    }
  };

  return (
    <div className='card-container-login'>
      <div className="d-flex flex-row justify-content-center align-item-center">
        <div className="d-flex flex-column justify-content-center min-vh-100">
          <form className="login-card" onSubmit={handleLogin}>
            <h3 className='text-center'>Login</h3>
            <div>
              <label>Email:</label>
              <input
                className='form-control'
                type="email"
                value={logemail}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mt-2'>
              <label>Password:</label>
              <input
                className='form-control'
                type="password"
                value={logpassword}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex flex-row justify-content-center">
              <button className='mt-3 btn' type="submit">Login</button>
            </div>
            <div>
              <p className='mt-2'>Don't have an account? Please register <a href="/register">here</a></p>
            </div>
            <div className='m-2 text-center'>
              {errormsg && <p style={{ color: 'red' }}>{errormsg}</p>}
              {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
