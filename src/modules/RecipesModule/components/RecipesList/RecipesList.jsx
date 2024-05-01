import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import NoData from '../../../SharedModule/components/noData/noData';
import NoDataimg from '../../../../assets/images/no-data.png';
import headerImg from "../../../../assets/images/header.png"
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import DeleteData from '../../../SharedModule/components/DeleteData/DeleteData';


export default function RecipesList() {
  const [RecipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelete,setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (item) => {
    setRecipeId(item)
    setShowDelete(true);
  }


  const getRecipesList = async()=> {
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      setRecipesList(response.data.data);
    }
    catch(error){
      console.log(error);
    }
  }

  //delete submit
  const onDeleteSubmit= async()=> {
    try{
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      handleDeleteClose();
      getRecipesList();
      console.log(response);
    }
    catch(error){
      console.log(error);
    }
  }

  //update submit
  const onUpdateSubmit= async(data)=> {
    try{
      let response = await axios.put(`https://upskilling-egypt.com:3006/api/v1/Recipes/${catId}`,
      data,
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      handleUpdateClose();
      getCategoriesList();
      console.log(response);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=> {
    getRecipesList();
  }, []);

  return (
    <>
      <Header title={'Recipes Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImg}/>
      
      
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Recipe</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={'Recipe'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-6">
            <h4>Recipe Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button onClick={handleShow} className='btn btn-success'>Add new Item</button>
          </div>
        </div>
        <br/>
        <table className="table table-striped table-hover table-borderless">
          <thead>
            <tr className='table-secondary'>
              <th scope="col">#</th>
              <th scope="col">Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {RecipesList.length>0 ?RecipesList.map((item,index)=>
            <tr key={item.id}>
              <th scope='row'>{index+1}</th>
              <td>{item.name}</td>
              <td>{item.imagePath?<img src={'https://upskilling-egypt.com:3006/'+item.imagePath} alt=""/>
              :(
                <img className='norecipeimg' src={NoDataimg} alt="no img"/>
              )}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <i className="fa fa-edit text-warning mx-2" aria-hidden="true"></i>
                <i onClick={()=>handleDeleteShow(item.id)} className="fa fa-trash text-danger" aria-hidden="true"></i>
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
    </>
  )
}
