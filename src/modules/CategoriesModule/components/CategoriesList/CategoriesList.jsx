import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import NoData from '../../../SharedModule/components/noData/noData';
import headerImg from "../../../../assets/images/header.png"
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import DeleteData from '../../../SharedModule/components/DeleteData/DeleteData';


export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [show, setShow] = useState(false);
  const [catId, setCatId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //Update Category code
  const [showUpdate,setShowUpdate] = useState(false);
  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (category) => {
    setCatId(category)
    setShowUpdate(true);
  }


  //Delete Category code
  const [showDelete,setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (category) => {
    setCatId(category)
    setShowDelete(true);
  }

  const getNameValue = (input) => {
    getCategoriesList(input.target.value);
  }

  const getCategoriesList = async(name)=> {
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
       params : {
          'name': name
        },
       }
      );
      setCategoriesList(response.data.data);
    }
    catch(error){
      console.log(error);
    }
  }

  let {
    register,
    handleSubmit, 
    formState: { errors }, 
  } = useForm();

  const onSubmit = async(data)=> {
    console.log(data);
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/',
      data, {
          headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        }
      );
      handleClose();
      getCategoriesList();
      console.log(response);
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  };

  //Delete Category code
  const onDeleteSubmit= async()=> {
    try{
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      handleDeleteClose();
      getCategoriesList();
      console.log(response);
    }
    catch(error){
      console.log(error);
    }
  }

  const onUpdateSubmit= async(data)=> {
    try{
      let response = await axios.put(`https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
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
    getCategoriesList();
  }, []);

  return (
    <>
      <Header title={'Category Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImg}/>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Add category</h3>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                    {...register("name" , {
                      required: "Name is required",
                    })}
                  />
                </div>
                {errors.name && <p className='alert alert-danger'>{errors.name.message}</p>}
                <button className='btn btn-success w-100'>Save</button>
              </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Category</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={'Category'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <h3>Update Category</h3>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onUpdateSubmit)} className='my-4'>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category name"
                    {...register("name" , {
                      required: "Name is required",
                    })}
                  />
                </div>
                <button className='btn btn-success w-100' onClick={onUpdateSubmit}>
                    Update
                </button>
              </form>
        </Modal.Body>
      </Modal>

      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-6">
            <h4>Categories Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button onClick={handleShow} className='btn btn-success'>Add new Category</button>
          </div>
        </div>
        
        <div className="filteration my-3">
          <div className="row">
            <div className="col-md-6">
              <input
                placeholder='search by category name...'
                type="text" 
                className='form-control'
                onChange={getNameValue} />
            </div>
          </div>
        </div>

        <table className="table table-striped table-hover table-borderless">
          <thead>
            <tr className='table-secondary'>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.length>0 ?categoriesList.map((category, index)=>
            <tr key={category.id}>
              <th scope="row">{index+1}</th>
              <td>{category.name}</td>
              <td>
                {new Date(category.creationDate).toLocaleDateString(
                  'en-US'
                )}
              </td>
              <td>
                <i onClick={()=>handleUpdateShow(category.id)} className='fa-solid fa-edit text-warning me-3' aria-hidden="true"></i>
                <i onClick={()=>handleDeleteShow(category.id)} className='fa-solid fa-trash text-danger' aria-hidden="true"></i>
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
