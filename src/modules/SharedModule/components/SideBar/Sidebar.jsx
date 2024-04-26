import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import toggler from "../../../../assets/images/3.png"
import { useState } from 'react';

export default function SideBar() {

  const [isCollapse, setIsCollapse] = useState(true);
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  }
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <div className='sidebar-container'>
      <Sidebar collapsed={isCollapse}>
        <Menu>
        <MenuItem onClick={toggleCollapse} icon={<img src={toggler} alt='logo' />} component={<Link to="/dashboard" />}></MenuItem>
            <MenuItem icon={<i className="fa fa-home" aria-hidden="true"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
            <MenuItem icon={<i className="fa fa-user" aria-hidden="true"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
            <MenuItem icon={<i className="fa fa-home" aria-hidden="true"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
            <MenuItem icon={<i className="fa fa-calendar" aria-hidden="true"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
            <MenuItem icon={<i className="fa fa-lock" aria-hidden="true"></i>} component={<Link to="/dashboard/users" />}> Change Password </MenuItem>
            <MenuItem icon={<i className="fa fa-sign-out" aria-hidden="true"></i>} onClick={logout}> Logout </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
