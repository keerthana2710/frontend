import React, {useState} from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import {createClient} from '@supabase/supabase-js';

const supabase = createClient('https://xkmeaillvfixvvjrpdfi.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrbWVhaWxsdmZpeHZ2anJwZGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0NDUwMjAsImV4cCI6MjAzODAyMTAyMH0.Z-x_y8mz6zfTmulsdMG4MkPX7LQD4MKTiRNLy55SvYc');

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const {error,data} = await supabase.auth.signUp({
      email : email,
      password : password,
    });
    localStorage.setItem('Logged_in',JSON.stringify(data.session));
    console.log(data.session)

    if (error) {
      setError(error.message);
    } else {
          setSuccess('Signup successful! Please check your email for confirmation.');
          setTimeout(()=>{
            navigate('/login');
          },2000)
    }
  };
  return (
    <div className='card-container'>
      <div className="d-flex flex-row justify-content-center align-item-center">
          <div className="d-flex flex-column justify-content-center min-vh-100">
            <form className="register-card" onSubmit={handleSignup}>
              <h3 className='text-center'>Sign Up</h3>
              <div>
                <label>Email:</label>
                <input
                className='form-control'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='mt-2'>
                <label>Password:</label>
                <input
                  className='form-control'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex flex-row justify-content-center">
                <button className='mt-3 btn' type="submit">Signup</button>
              </div>
              <div className='m-3'>
                  {errormsg && <p style={{ color: 'red' }}>{errormsg}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
            </form>
          </div>  
      </div>
    </div>  
  );
};

export default Register;