import "./App.css";
import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from './modules/SharedModule/components/AuthLayout/AuthLayout';
import Notfound from './modules/SharedModule/components/Notfound/Notfound';
import MasterLayout from './modules/SharedModule/components/MasterLayout/MasterLayout';
import Dashboard from './modules/HomeModule/components/Dashboard/Dashboard';
import RecipesList from './modules/RecipesModule/components/RecipesList/RecipesList';
import CategoriesList from './modules/CategoriesModule/components/CategoriesList/CategoriesList';
import UsersList from './modules/UsersModule/components/UsersList/UsersList';
import Login from './modules/AuthenticationModule/components/login/Login';
import Register from './modules/AuthenticationModule/components/register/Register';
import ForgetPass from './modules/AuthenticationModule/components/ForgetPass/ForgetPass';
import ResetPass from './modules/AuthenticationModule/components/ResetPass/ResetPass';
import ChangePass from "./modules/AuthenticationModule/components/changepass/ChangePass";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";

function App() {
 let [loginData,setLoginData] = useState(null);
 let saveLoginData = () => {
   let encodedToken = localStorage.getItem('token');
   let decodedToken = jwtDecode(encodedToken);
   console.log(decodedToken);
   setLoginData(decodedToken);
 }
 useEffect(() => {
    if(localStorage.getItem('token')) {
      saveLoginData()
    }
  }, []);

 
 let routes = createBrowserRouter([
  {
    path:'dashboard',
    element:(<ProtectedRoute loginData={loginData}>
              <MasterLayout loginData={loginData}/>
            </ProtectedRoute>),
    errorElement:<Notfound />,
    children: [
      {index: true, element: <Dashboard /> },
      {path: "home", element: <Dashboard />},
      {path: "recipes", element: <RecipesList />},
      {path: "categories", element: <CategoriesList />},
      {path: "users", element: <UsersList />},
    ],
  },
  {
    path:'/',
    element:<AuthLayout />,
    errorElement:<Notfound />,
    children: [
      {index: true, element: <Login saveLoginData={saveLoginData} /> },
      {path: "login", element: <Login saveLoginData={saveLoginData}/>},
      {path: "register", element: <Register />},
      {path: "forgetpass", element: <ForgetPass />},
      {path: "changepass", element: <ChangePass />},
      {path: "resetpass", element: <ResetPass />},
    ],
  }
 ])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  )
}

export default App;