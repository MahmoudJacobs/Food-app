import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import NoData from '../../../SharedModule/components/noData/noData';
import headerImg from "../../../../assets/images/header.png"
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';


export default function UsersList() {
  const [usersList, setUsersList] = useState([]);

  const getUsersList = async()=> {
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=10&pageNumber=1',
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      setUsersList(response.data.data);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=> {
    getUsersList();
  }, []);

  return (
    <div>
     <Header title={'Users List'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImg}/>
     <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-6">
            <h4>Users Table Details</h4>
            <span>You can check all details</span>
          </div>
        </div>
        <br/>
        <table className="table table-striped table-hover table-borderless">
          <thead>
            <tr className='table-secondary'>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope='col'>email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length>0 ?usersList.map((item,index)=>
            <tr key={item.id}>
              <th scope='row'>{index+1}</th>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>
                <i className="fa fa-edit text-warning mx-2" aria-hidden="true"></i>
                <i className="fa fa-trash text-danger" aria-hidden="true"></i>
              </td>
              </tr>):(
                <tr>
                  <td colSpan="4" >
                    <NoData />
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
