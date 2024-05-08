import React from 'react'
import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from "react-router-dom"


export default function AuthLayout(loginData) {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, []);

  return <Outlet />;
}