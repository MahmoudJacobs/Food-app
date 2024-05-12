import React from 'react';
import logo from '../../../../assets/images/logo.png';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function ForgetPass() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit, 
    formState: { errors }, 
  } = useForm();

  const onSubmit = async(data)=> {
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data);
      console.log(response);
      toast.success('Your request is being processed, please check your email');
      navigate('/ResetPass');
    }
    catch(error){
      toast.error(error.response.data.message);
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
              <div className='form-content'>
                <h3>Forgot Your Password?</h3>
              </div>
              <p className='text-muted'>
                No worries! Please enter your email and we will send a password reset link 
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-envelope text-success'></i>
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
                <button className='btn btn-success w-100'>Submit</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}
