import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../../../assets/images/logo.png';


export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };
  
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const validateConfirmPassword = (value) => {
      const newPassword = getValues('password');
      return value === newPassword || 'Passwords do not match';
    };

    const appendToFormData=(data)=> {
      const formData = new FormData()
      formData.append('userName',data.userName);
      formData.append('email',data.email);
      formData.append('country',data.country);
      formData.append('phoneNumber',data.phoneNumber);
      formData.append('profileImage',data.profileImage);
      formData.append('password',data.password);
      formData.append('confirmPassword',data.confirmPassword);
      return formData;
    }


  let {
    register,
    handleSubmit, 
    formState: { errors }, 
    getValues,
  } = useForm();

  const onSubmit =async(data)=> {
    let RegisterFormData = appendToFormData(data);
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Register',RegisterFormData,
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
      toast.success(response.data.message);
      navigate('/verifyAccount');
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
              <h3>Register</h3>
              <p className='text-muted'>
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                  <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-user'></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your user name"
                    {...register("userName" , {
                      required: "userName is required",
                      maxLength: {
                        value: 8,
                        message: 'The userName may not be greater than 8 characters.'
                      }
                    })}
                  />
                </div>
                {errors.userName && <p className='alert alert-danger'>{errors.userName.message}</p>}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-2">
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
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                  <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-globe'></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    {...register("country" , {
                      required: "country is required",
                      
                    })}
                  />
                </div>
                {errors.country && <p className='alert alert-danger'>{errors.country.message}</p>}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-2">
                    <span className="input-group-text" id="basic-addon1">
                      <i className='fa fa-mobile'></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      {...register("phoneNumber" , {
                        required: "phoneNumber is required",
                      })}
                    />
                    </div>
                   {errors.phoneNumber && <p className='alert alert-danger'>{errors.phoneNumber.message}</p>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                  <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-lock'></i>
                  </span>
                  <input
                    type={showPassword ? "password" : "text"}
                    className="form-control"
                    placeholder="Enter your Password"
                    {...register("password" , {
                      required: "password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
                        message: 'Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long'
                      }
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
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-2">
                    <span className="input-group-text" id="basic-addon1">
                      <i className='fa fa-lock'></i>
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm your password"
                      {...register("confirmPassword" , {
                        required: "confirmPassword is required",
                        validate: validateConfirmPassword
                      })}
                    />
                    <span className="input-group-text" id="basic-addon2">
                    <i
                      className={showConfirmPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} 
                      onClick={toggleConfirmPasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </span>
                    </div>
                   {errors.confirmPassword && <p className='alert alert-danger'>{errors.confirmPassword.message}</p>}
                  </div>
                </div>
                
                <div className="input-group mb-2">
                  <input
                    type="file"
                    className="form-control"
                    {...register("profileImage", {
                      required:'profileImage is required'
                    })}
                  />
                </div>
                {errors.profileImage && <p className='alert alert-danger'>{errors.profileImage.message}</p>}
                <div className="links d-flex justify-content-end my-3">
                  <Link to="/login" className='text-decoration-none text-success'>Login Now</Link>
                </div>
                <button className='btn btn-success w-100'>Register</button>
                  </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
