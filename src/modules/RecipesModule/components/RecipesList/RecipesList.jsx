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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function RecipesList() {
  const navigate = useNavigate();
  const [RecipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [userData, setUserData] = useState(null);
  const [catValue, setCatValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState('');
  const [SelectedRecipeImage, setSelectedRecipeImage] = useState('');
  const [SelectedRecipeDesc, setSelectedRecipeDesc] = useState('');
  const [ArrayOfPages, setArrayOfPages] = useState([]);
  const [SelectedRecipe, setSelectedRecipe] = useState(null);
  const baseURL = 'https://upskilling-egypt.com:3006/api/v1'
  const staticUrl = 'https://upskilling-egypt.com:3006/'

  const getCategoriesList = async()=> {
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      console.log(response.data.data);
      setCategoriesList(response.data.data);
    }
    catch(error){
      console.log(error);
    }
  }

  const getTagsList = async()=> {
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/tag',
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      console.log(response.data);
      setTagsList(response.data);
    }
    catch(error){
      console.log(error);
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [showView, setShowView] = useState(false);
  const handleViewClose = () => setShowView(false);
  
  const handleViewShow = (item) => {
    setSelectedRecipe(item);
    setSelectedRecipeImage(staticUrl + item.imagePath);
    setSelectedRecipeDesc(item.description);
    setRecipeId(item.id);
    setShowView(true);
  }
  const [loading, setLoading] = useState(false);

  const onViewSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/userRecipe/',
        { recipeId: recipeId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Added to Favourites')
      console.log('Recipe favorited successfully!');
    } catch (error) {
      console.error('Error favoriting recipe:', error);
    } finally {
      setLoading(false);
      handleViewClose();
    }
  };


  const [showDelete,setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (item) => {
    setRecipeId(item)
    setShowDelete(true);
  }


  const [showUpdate,setShowUpdate] =useState(false);
  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (item) => {
    setRecipeId(item)
    setShowUpdate(true);
  } 

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(input.target.value,tagValue,catValue);
  }

  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipesList(nameValue, tagValue,input.target.value);
  }

  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipesList(nameValue, input.target.value, catValue);
  }


  const getRecipesList = async(name, tagId, catId, pageSize, pageNumber)=> {
    
    try{
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      params : {
            'name' : name,
            'tagId': tagId,
            'categoryId': catId
          },
        }
      );
      
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i) => i+1))
      console.log(ArrayOfPages);
      console.log(response.data.totalNumberOfPages);
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

  let {
    register,
    handleSubmit, 
    formState: { errors }, 
  } = useForm();

  //AppendToUpdate
  const appendToFormData=(data)=> {
    const formData = new FormData()
    formData.append('name',data.name);
    formData.append('description',data.description);
    formData.append('price',data.price);
    formData.append('tagId',data.tagId);
    formData.append('recipeImage',data.recipeImage[0]);
    formData.append('categoriesIds',data.categoriesIds);
    return formData;
  }

  //update submit
  const onUpdateSubmit= async(data)=> {

    let recipeFormData = appendToFormData(data);
    try{
      let response = await axios.put(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
      recipeFormData,
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      toast.success('Recipe Updated')
      handleUpdateClose();
      getRecipesList();
      console.log(response);
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
  }



  const goToRecipeData = () => {
    navigate('/dashboard/recipeData')
  }

  useEffect(()=> {
    getRecipesList("","","", 5, 1);
    getCategoriesList();
    getTagsList();
    setUserData(JSON.parse (localStorage.getItem("userData")));
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

      <Modal show={showUpdate} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <h3>Update Recipe</h3>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onUpdateSubmit)} className='my-4'>
              <div className='row justify-content-center'>
                <div className='col-md-6 text-center'>
                <img className='' src={headerImg} alt="no img"/> 
                </div>
              </div>
              <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Recipe name"
                    {...register("name" , {
                      required: "Name is required",
                    })}
                  />
              </div>
              {errors.name && <p className='alert alert-danger p-2'>{errors.name.message}</p>}
              
                <div className="input-group mb-2">
                 <textarea className='form-control bg-light' placeholder="Recipe description"
                    {...register("description" , {
                      required: "description is required"
                    })}/>
                </div>
                {errors.description && <p className='alert alert-danger p-2'>{errors.description.message}</p>}

                <div className="input-group mb-2">
                  <input
                    type="number"
                    className="form-control bg-light"
                    placeholder="Recipe price"
                    {...register("price", {
                      required:'price is required'
                    })}
                  />
                </div>
                {errors.price && <p className='alert alert-danger p-2'>{errors.price.message}</p>}

                <div className="input-group mb-2">
                  <select className='form-control bg-light'
                    {...register("tagId" , {
                      required: "tag is required"
                    })}>
                    <option value=''>select</option>
                    {tagsList.map((tag)=> (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                    ))}
                  </select>
                </div>
                {errors.tagId && <p className='alert alert-danger p-2'>{errors.tagId.message}</p>}

                <div className="input-group mb-2">
                    <input
                    type="file"
                    className="form-control bg-light"
                    {...register("recipeImage" , {
                      required: "image is required"
                    })}
                  />
                </div>
                {errors.recipeImage && <p className='alert alert-danger p-2'>{errors.recipeImage.message}</p>}

                <div className="input-group mb-2">
                  <select className='form-control bg-light'
                    {...register("categoriesIds" , {
                      required: "categoriesIds is required"
                    })}>
                    <option value=''>select</option>
                    {categoriesList.map((cat)=> (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                    ))}
                  </select>
                </div>
                {errors.categoriesIds && <p className='alert alert-danger p-2'>{errors.categoriesIds.message}</p>}

                <button className='btn btn-success w-100'>
                    Update
                </button>
              </form>
        </Modal.Body>
      </Modal>

      <Modal show={showView} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <h3>Recipe Details</h3>
        </Modal.Header>
        <Modal.Body>
        <div className='text-center'>
          <img className='w-50 rounded mb-md-3' src={SelectedRecipeImage} alt='Recipe Image'/>
          <p className=''>{SelectedRecipeDesc}</p>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={onViewSubmit} className='btn btn-success w-100' disabled={loading}>
              {loading ? 'favoriting' : 'Favorite'}
            </button>
        </Modal.Footer>
      </Modal>

      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-6">
            <h4>Recipe Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            {userData?.userGroup=='SuperAdmin'?( 
            <button onClick={goToRecipeData} className='btn btn-success'>
              Add new Recipe
            </button>
            ) : (
              ""
            )}  
          </div>
        </div>
        <div className="filteration my-3">
          <div className="row">
            <div className="col-md-6">
              <input
                placeholder='search by recipe name...'
                type="text" 
                className='form-control'
                onChange={getNameValue} />
            </div>
            <div className="col-md-3">
              <select className='form-control' onChange={getCatValue}>
                <option value="" >search by category</option>
                    {categoriesList.map((cat)=> (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                    ))}
              </select>
            </div>
            <div className="col-md-3">
              <select className='form-control' onChange={getTagValue}>
                <option value="" >search by tag</option>
                {tagsList.map((tag)=> (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                    ))}
              </select>
            </div>
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
              <th scope='col'>Category</th>
              <th scope='col'>Tag</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {RecipesList.length>0 ?RecipesList.map((item,index)=>
            <tr key={item.id}>
              <th scope='row'>{index+1}</th>
              <td>{item.name}</td>
              <td className='imagetd'>{item.imagePath?<img className='Recipeimg' src={'https://upskilling-egypt.com:3006/'+item.imagePath} alt=""/>
              :(
                <img className='norecipeimg' src={NoDataimg} alt="no img"/>
              )}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.category.length > 0 ? item.category[0].name : 'No Category'}</td>
              <td>{item.tag.name}</td>
              {userData?.userGroup=='SuperAdmin'?(
              <td>
                <i onClick={()=>handleUpdateShow(item.id)} className="fa fa-edit text-warning mx-2" aria-hidden="true"></i>
                <i onClick={()=>handleDeleteShow(item.id)} className="fa fa-trash text-danger" aria-hidden="true"></i>
              </td>
              ) : (
              ""
              )} 
              {userData?.userGroup=='SystemUser'?(
              <td>
                <i onClick={()=>handleViewShow(item)} className="fa fa-eye text-primary" aria-hidden="true"></i>
              </td>
              ) : (
              ""
              )} 
              </tr>):(
                <tr>
                  <td colSpan="8" >
                    <NoData />
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <nav className='d-flex justify-content-center' aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {ArrayOfPages.map((pageNo)=> (
            <li className="page-item" onClick={()=>getRecipesList(nameValue,tagValue,catValue,5,pageNo)}>
              <a className="page-link" href="#">{pageNo}</a>
            </li>
          ))}

          
          
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      </div>
      
    </>
  )
}
