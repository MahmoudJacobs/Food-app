import "./App.css";
import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from './modules/SharedModule/components/AuthLayout/AuthLayout';
import Notfound from './modules/SharedModule/components/Notfound/Notfound';
import MasterLayout from './modules/SharedModule/components/MasterLayout/MasterLayout';
import Dashboard from './modules/HomeModule/components/Dashboard/Dashboard';
import RecipesList from './modules/RecipesModule/components/RecipesList/RecipesList';
import CategoriesList from './modules/CategoriesModule/components/CategoriesList/CategoriesList';
import UsersList from './modules/UsersModule/components/UsersList/UsersList';
import FavList from './modules/FavsModule/components/FavsList/FavList'
import Login from './modules/AuthenticationModule/components/login/Login';
import Register from './modules/AuthenticationModule/components/register/Register';
import ForgetPass from './modules/AuthenticationModule/components/ForgetPass/ForgetPass';
import ResetPass from './modules/AuthenticationModule/components/ResetPass/ResetPass';
import ChangePass from "./modules/AuthenticationModule/components/changepass/ChangePass";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import RecipeData from "./modules/RecipesModule/components/RecipeData/RecipeData";
import VerifyAccount from "./modules/AuthenticationModule/components/verifyAccount/VerifyAccount"
import RecipeEdit from "./modules/RecipesModule/components/RecipeEdit/RecipeEdit";

function App() {
 let [loginData,setLoginData] = useState(null);
 const [loading, setLoading] = useState(true);

 let saveLoginData = () => {
   const encodedToken = localStorage.getItem('token');
   if (encodedToken) {
   let decodedToken = jwtDecode(encodedToken);
   localStorage.setItem("userData", JSON.stringify(decodedToken));
   console.log(decodedToken);
   setLoginData(decodedToken);
 }
 setLoading(false)
}
 useEffect(() => {
    if(localStorage.getItem('token')) {
      saveLoginData()
    } else {
      setLoading(false);
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
      {path: "recipeData", element: <RecipeData />},
      {path: "recipeEdit", element: <RecipeEdit />},
      {path: "categories", element: loginData && loginData.userGroup === 'SuperAdmin' ? <CategoriesList /> : <Navigate to="/login" />},
      {path: "users", element: loginData && loginData.userGroup === 'SuperAdmin' ? <UsersList /> : <Navigate to="/login" />},
      {path: "Favs", element: (
        loginData && loginData.userGroup === 'SystemUser' ?
        <FavList /> 
        : <Navigate to="/login" />
        )
      },
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
      {path: "VerifyAccount", element: <VerifyAccount />},
      {path: "changepass", element: <ChangePass />},
      {path: "resetpass", element: <ResetPass />},
    ],
  }
 ])


  return (
    <>
      {loading ? (
        // Render loading state while authentication is in progress
        <p>Loading...</p>
      ) : (
      <RouterProvider router={routes}>
        {loginData !== null ? (
          <MasterLayout loginData={loginData} />
        ) : (
          <Navigate to="/login" />
        )}
      </RouterProvider>
      )}
      <ToastContainer />
    </>
  )
}

export default App;