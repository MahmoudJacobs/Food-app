import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from "react-router-dom"


export default function MasterLayout({loginData}) {
  return (
   
    <div className='d-flex'>
      {loginData && (
        <div>
          <SideBar loginData={loginData} />
        </div>
      )}
      <div className='w-100 vh-100 overflow-y-auto'>
          <Navbar loginData={loginData} />
          <Outlet/>
      </div>
    </div>
  )
}
