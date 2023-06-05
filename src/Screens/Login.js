import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      'http://localhost:5000/api/loginuser',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.authToken);
      navigate('/');
    } else {
      alert('Enter Valid Credentials');
    }
  };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className="container p-5 mx-3">
        <form
          onSubmit={handleSubmit}
          className="w-50 p-4 rounded ms-2 "
        >
          <div className="mb-3">
            <label
              htmlFor="Email1"
              className="form-label fw-bold text-white"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control fw-bold"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold text-white"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control fw-bold"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success m-3 fw-bold"
          >
            Login
          </button>
          <Link
            to="/createuser"
            className="m-3 btn btn-danger fw-bold"
          >
            I am a New User
          </Link>
        </form>
      </div>
    </div>
  );
}
