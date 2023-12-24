import React, { useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./components/context/auth";
// import { useAuth } from "../../context/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[auth,setAuth]=useAuth();

  const navigate = useNavigate();

if(auth?.token){
  //if already logged in then redirect to home page
  navigate('/home');

}


  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
  
      if (res.data && res.data.token) {
        alert("Login successfully");
  
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
  
        localStorage.setItem('auth', JSON.stringify(res.data));
  
        navigate("/home");
        window.location.reload();
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Wrong username or password");
    }
  };
  


  return (
      <div className="form-container item">
        <form onSubmit={handleSubmit}>
          <h4 className="title">PLEASE LOGIN TO CONTINUE</h4>

          <div className="mb-3 ">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Username from JsonDummy "
              required
            />
          </div>
          <div className="mb-3 ">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
         
        </form>
      </div>
      
  );
};

export default Login;