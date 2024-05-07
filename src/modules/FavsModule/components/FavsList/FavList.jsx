import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import headerImg from "../../../../assets/images/header.png"
import Header from '../../../SharedModule/components/Header/Header'
import NoData from '../../../SharedModule/components/noData/noData';


export default function FavList() {
    let [favsList, setFavsList] = useState([]);
    const [recipeId, setRecipeId] = useState();
    const staticUrl = 'https://upskilling-egypt.com:3006/'

    const getFavsList = async()=> {
        try{
          let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/userRecipe`,
            {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},}
          );
          setFavsList()
          setFavsList(response.data.data);
        }
        catch(error){
          console.log(error);
        }
      }

      const removeFav = async(fav)=> {
        try{
            const recipeId = fav.recipe.id;
            let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/userRecipe/${fav.id}`,
            {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},}
          );
          toast.success('Recipe Removed from Favourites')
          console.log(response);
          getFavsList();
        }
        catch(error) {
            console.log(error);
        }
      }

      useEffect(() => {
        getFavsList()
      }, [])
  return (
    <div>
        <Header title={'Favourite Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImg}/>
        <div className="container-fluid">
            <div className="row mt-md-5">
                {favsList.length > 0 ?favsList.map((fav) => 
                <div key={fav.id} className="col-md-4 d-flex justify-content-center">
                    <div className='position-relative w-50 mb-md-5 rounded-3 shadow border border-2 text-start bg-light'>
                        <img className='w-100 rounded' src={staticUrl + fav.recipe.imagePath} alt='no image'/>
                        <div className="position-absolute w-25 text-center top-0 end-0 translate-start m-3 rounded-circle">
                            <div onClick={() => removeFav(fav)}  className='bg-white rounded' data-toggle="tooltip" data-placement="top" title="Remove from Favourites">
                                <i className="fa fa-heart text-success"></i>
                            </div>
                        </div>
                        <h6 className='m-3'>{fav.recipe.name}</h6>
                        <p className='m-3'>{fav.recipe.description}</p>
                    </div>
                </div>
                ) : (
                    <NoData />
                )}
            </div>
        </div>
    </div>
  )
}
