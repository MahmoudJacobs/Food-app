import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import toggler from "../../../../assets/images/3.png"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import ChangePass from '../../../AuthenticationModule/components/changepass/ChangePass';


export default function SideBar({loginData}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isCollapse, setIsCollapse] = useState(true);
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  }
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData')
    navigate("/login");
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <ChangePass/>
          </Modal.Body>
      </Modal>
      <div className='sidebar-container'>
        <Sidebar collapsed={isCollapse}>
          <Menu>
          <MenuItem onClick={toggleCollapse} icon={<img src={toggler} alt='logo' />}></MenuItem>
              <MenuItem icon={<i className="fa fa-home" aria-hidden="true"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
              {loginData.userGroup =='SuperAdmin'?(<MenuItem
                icon={<i className="fa fa-user" 
                aria-hidden="true"></i>} 
                component={<Link to="/dashboard/users" />}> Users 
                </MenuItem>
                ) : (
                  ""
                )}
              

              <MenuItem icon={<i className="fa fa-cutlery" aria-hidden="true"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>

              {loginData.userGroup=='SuperAdmin'?(<MenuItem
                icon={<i className="fa fa-calendar" aria-hidden="true"></i>}
                component={<Link to="/dashboard/categories" />}> 
                Categories </MenuItem>
              ) : (
                ""
              )}
              

              {loginData.userGroup=='SystemUser'?(<MenuItem
                icon={<i className="fa fa-heart" aria-hidden="true"></i>}
                component={<Link to="/dashboard/Favs" />}> 
                Favourites </MenuItem>
              ) : (
                ""
              )}
              
              <MenuItem icon={<i className="fa fa-lock" aria-hidden="true"></i>} onClick={handleShow}> Change Password </MenuItem>
              <MenuItem icon={<i className="fa fa-sign-out" aria-hidden="true"></i>} onClick={logout}> Logout </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      </>
  )
}
