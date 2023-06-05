import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let [address, setAddress] = useState("");
  let navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    let [lat, long] = latlong
    console.log(lat, long)
    const response = await fetch("http://localhost:5000/api/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: 'cover',
          height: '100vh',
        }}
      >
        <div>
          <Navbar />
        </div>

        <div className="container p-5 mx-3">
          <form
            onSubmit={handleSubmit}
            className="w-50 p-4 rounded ms-2"
          >
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label fw-bold text-white"
              >
                Name
              </label>
              <input
                type="text"
                className="form-control fw-bold"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <fieldset>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  aria-describedby="emailHelp"
                />
              </fieldset>
            </div>
            <div className="m-3">
              <button
                type="button"
                onClick={handleClick}
                name="geolocation"
                className="btn btn-success"
              >
                Click for current Location{' '}
              </button>
            </div>

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
                id="exampleInputEmail1"
                name="email"
                aria-describedby="emailHelp"
                value={credentials.email}
                onChange={onChange}
              />
              <div
                id="emailHelp"
                className="form-text fw-bold text-white"
              >
                We'll never share your email with anyone else.
              </div>
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
                name="password"
                id="exampleInputPassword1"
                value={credentials.password}
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success m-3 fw-bold"
            >
              Signup
            </button>
            <Link to="/login" className="m-3 btn btn-danger fw-bold">
              Already a User
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
