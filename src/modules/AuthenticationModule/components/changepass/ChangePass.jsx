import React from 'react'
import logo from '../../../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';


export default function ChangePass() {
  let {
    register,
    handleSubmit, 
    formState: { errors }, 
    getValues
  } = useForm();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword)
  }


  const validateConfirmPassword = (value) => {
    const newPassword = getValues('newPassword');
    return value === newPassword || 'Passwords do not match';
  };

  const onSubmit =async(data)=> {
    try{
      let response = await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword',data,
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
      toast.success("Password Changed Successfully");
      logout();
    }
    catch(error){
      toast.error(error.response.data.message)
    }
  };

  return (
    <div>
      <div className='container-fluid w-100'>
          <div className='row justify-content-center align-content-center'>
          <div className='col-md-11'>
            <div className='text-center'>
              <img src={logo} alt='' className='logo w-100'/>
            </div>
            <div className="form-content">
              <h3>Change Your Password</h3>
              <p className='text-muted'>
                Enter your details below
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-key'></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Old Password"
                    {...register("oldPassword" , {
                      required: "old password required"
                    })}
                  />
                </div>
                {errors.oldPassword && <p className='alert alert-danger'>{errors.oldPassword.message}</p>}
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-lock'></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="New Password"
                    {...register("newPassword", {
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
                {errors.newPassword && <p className='alert alert-danger'>{errors.newPassword.message}</p>}
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-lock'></i>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm New Password"
                    {...register("confirmNewPassword", {
                        required: "confirm New password is required",
                        validate: validateConfirmPassword
                    })}
                  />
                  <span onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }} className="input-group-text" id="basic-addon2">
                    <i className={showConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                  </span>
                </div>
                {errors.confirmNewPassword && <p className='alert alert-danger'>{errors.confirmNewPassword.message}</p>}
                <button className='btn btn-success w-100'>Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
