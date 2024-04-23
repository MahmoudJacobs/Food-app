import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../SideBar/Sidebar'
import { Outlet } from "react-router-dom"


export default function MasterLayout({loginData}) {
  return (
   <div className='container'>
    <div className='row'>
      <div className='col-md-3'>
        <div>
          <Sidebar/>
        </div>
      </div>
      <div className='col-md-9'>
        <div>
          <Navbar loginData={loginData} />
          <Header/>
          <Outlet/>
        </div>
      </div>
    </div>
   </div>
  )
}
