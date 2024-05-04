import React from 'react'
import logo from '../../../../assets/images/logo.png';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function ResetPass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword)
  }

  let {
    register,
    handleSubmit, 
    formState: { errors }, 
    getValues
  } = useForm();
  
  const validateConfirmPassword = (value) => {
    const newPassword = getValues('password');
    return value === newPassword || 'Passwords do not match';
  };

  const onSubmit =async(data)=> {
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data);
      toast.success("Password Reset Successfully");
      navigate('/');
    }
    catch(error){
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className='auth-container'>
      <div className='container-fluid vh-100 bg-overlay'>
        <div className='row vh-100 justify-content-center align-content-center'>
          <div className='col-md-6 rounded bg-white p-4 border border-3'>
            <div className='text-center'>
              <img src={logo} alt='' className='logo w-50'/>
            </div>
            <div className="form-content">
              <h3>Reset Password</h3>
              <p className='text-muted'>
                Please Enter your Otp or Check Your Inbox
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-envelope'></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="E-mail"
                    {...register("email" , {
                      required: "Email required",
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
                    <i className='fa fa-lock'></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="New Password"
                    {...register("password", {
                        required: "New Password is required",
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                    })}
                  />
                  <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} className="input-group-text" id="basic-addon2">
                    <i
                      className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} 
                    ></i>
                  </span>
                </div>
                {errors.password && <p className='alert alert-danger'>{errors.password.message}</p>}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-lock'></i>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm New Password"
                    {...register("confirmPassword", {
                        required: "confirm New password is required",
                        validate: validateConfirmPassword
                    })}
                  />
                  <span onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }} className="input-group-text" id="basic-addon2">
                    <i className={showConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                  </span>
                </div>
                {errors.confirmPassword && <p className='alert alert-danger'>{errors.confirmPassword.message}</p>}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-lock'></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    {...register("seed" , {
                      required: "OTP required",
                      minLength: {
                        value: 4,
                        message: 'OTP must be at least 4 characters'
                      }
                    })}
                  />
                </div>
                {errors.seed && <p className='alert alert-danger'>{errors.seed.message}</p>}
                <button className='btn btn-success w-100'>Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
