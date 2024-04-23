import React from 'react'
import logo from '../../../../assets/images/logo.png';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function Login({saveLoginData}) {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

  let {
    register,
    handleSubmit, 
    formState: { errors }, 
  } = useForm();

  const onSubmit =async(data)=> {
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data);
      toast.success('Login Successful !');
      localStorage.setItem('token',response.data.token);
      saveLoginData();
      navigate('/dashboard');
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className='auth-container'>
      <div className='container-fluid vh-100 bg-overlay'>
        <div className='row vh-100 justify-content-center align-content-center'>
          <div className='col-md-6 bg-white p-4 border border-3 rounded'>
            <div className='text-center'>
              <img src={logo} alt='' className='logo w-50'/>
            </div>
            <div className='form-content'>
              <h3>Log in</h3>
              <p className='text-muted'>
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-envelope'></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your E-mail"
                    {...register("email" , {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                        message: 'Invalid Mail'
                      }
                    })}
                  />
                </div>
                {errors.email && <p className='alert alert-danger'>{errors.email.message}</p>}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-key'></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    {...register("password", {
                      required:'Password is required'
                    })}
                  />
                  <span className="input-group-text" id="basic-addon2">
                    <i
                      className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} 
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </span>
                </div>
                {errors.password && <p className='alert alert-danger'>{errors.password.message}</p>}
                <div className="links d-flex justify-content-between my-3">
                  <a href='../Register' className='text-decoration-none text-secondary'>Register Now?</a>
                  <a href='../ForgetPass' className='text-decoration-none text-success'>Forgot Password?</a>
                </div>
                <button className='btn btn-success w-100'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}