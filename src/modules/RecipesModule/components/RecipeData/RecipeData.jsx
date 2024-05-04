import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FillandShow from '../../../SharedModule/components/FillandShow/FillandShow'

export default function RecipeData() {
    const [categoriesList, setCategoriesList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const navigate = useNavigate();
    const cancelClick =()=> {
        navigate('/dashboard/recipes')
    };

    let {
        register,
        handleSubmit, 
        formState: { errors }, 
      } = useForm();

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

      const appendToFormData=(data)=> {
        const formData = new FormData()
        formData.append('name',data.name);
        formData.append('price',data.price);
        formData.append('description',data.description);
        formData.append('categoriesIds',data.categoriesIds);
        formData.append('tagId',data.tagId);
        formData.append('recipeImage',data.recipeImage[0]);
        return formData;
      }

      const onSubmit =async(data)=> {

        console.log("categoriesIds:", data.categoriesIds);

        let recipeFormData = appendToFormData(data);
        try{
          let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Recipe',recipeFormData,
          {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
          toast.success('Recipe Saved');
          navigate('/dashboard/recipes')
        }
        
        catch(error){
        alert('success');
          toast.error(error.response.data.message);
        }
      };

      useEffect(()=> {
        getCategoriesList();
        getTagsList();
      }, []);

  return (
    <div>
      <FillandShow />
      <div className='container w-75 p-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control bg-light"
                    placeholder="Recipe Name"
                    {...register("name" , {
                      required: "name is required"
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

                <button className='m-3 btn btn-success '>Save</button><span><button onClick={cancelClick} className='btn btn-outline-danger col-md-2'>Cancel</button></span>
        </form>
        </div>
    </div>
  )
}
