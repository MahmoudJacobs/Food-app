import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import NoData from '../../../SharedModule/components/noData/noData';
import headerImg from "../../../../assets/images/header.png"
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import DeleteData from '../../../SharedModule/components/DeleteData/DeleteData';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';


export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [UserNameValue, setUserNameValue] = useState('');
  const [EmailValue, setEmailValue] = useState('');
  const [CountryValue, setCountryValue] = useState('');
  const [GroupValue, setGroupValue] = useState('');
  const [ArrayOfPages, setArrayOfPages] = useState([]);
  const [showDelete,setShowDelete] = useState(false);
  const [UserId, setUserId] = useState('');


  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (item) => {
    setUserId(item)
    setShowDelete(true);
  }


  const getUsersList = async(userName, email, country, groups, pageSize, pageNumber)=> {
    try{
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
       params : {
            'userName' : userName,
            'email' : email,
            'country': country,
            'groups': groups
          }
        }
      );
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i) => i+1))
      setUsersList(response.data.data);
    }
    catch(error){
      console.log(error);
    }
  }

  const onDeleteSubmit= async()=> {
    try{
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Users/${UserId}`,
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      handleDeleteClose();
      getUsersList("","","","", 10, 1);
      toast.success("The user has been deleted successfully")
      console.log(response);
    }
    catch(error){
      toast.error(error);
      console.log(error);
    }
  }

  const getUserNameValue = (input) => {
      setUserNameValue(input.target.value);
      getUsersList(input.target.value,EmailValue,CountryValue,GroupValue);
  }

  const getEmailValue = (input) => {
      setEmailValue(input.target.value);
      getUsersList(UserNameValue,input.target.value,CountryValue,GroupValue);
  }
  const getCountryValue = (input) => {
      setCountryValue(input.target.value);
      getUsersList(UserNameValue,EmailValue,input.target.value,GroupValue);
  }
  const getGroupsValue = (input) => {
    setGroupValue(input.target.value);
    getUsersList(UserNameValue,EmailValue,CountryValue,input.target.value);
  }

  useEffect(()=> {
    getUsersList("","","","", 10, 1);
  }, []);

  return (
    
    <div>


      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete User</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={'User'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>



     <Header title={'Users List'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImg}/>
     <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-6">
            <h4>Users Table Details</h4>
            <span>You can check all details</span>
          </div>
        </div>

        <div className="filteration my-3">
          <div className="row">
            <div className="col-md-3">
              <input
                placeholder='search by user name...'
                type="text" 
                className='form-control'
                onChange={getUserNameValue} />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder='search by Email'
                className='form-control'
                onChange={getEmailValue}
               />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder='search by country'
                className='form-control'
                onChange={getCountryValue}/>
            </div>
            <div className="col-md-2">
              <input
                type="text"
                placeholder='search by group'
                className='form-control'
                onChange={getGroupsValue}/>
            </div>
          </div>
        </div>

        <br/>
        <table className="table table-striped table-hover table-borderless">
          <thead>
            <tr className='table-secondary'>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Group</th>
              <th scope='col'>Country</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length>0 ?usersList.map((item,index)=>
            <tr key={item.id}>
              <th scope='row'>{index+1}</th>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>{item.group.name}</td>
              <td>{item.country}</td>
              <td>
                <i onClick={()=>handleDeleteShow(item.id)} className="fa fa-trash text-danger" aria-hidden="true"></i>
              </td>
              </tr>):(
                <tr>
                  <td colSpan="6" >
                    <NoData />
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <nav className='d-flex justify-content-center' aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {ArrayOfPages.map((pageNo)=> (
            <li className="page-item" onClick={()=>getUsersList(UserNameValue, EmailValue, CountryValue, GroupValue, 10,pageNo)}>
              <a className="page-link">{pageNo}</a>
            </li>
          ))}

          
          
          <li className="page-item">
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  )
}
