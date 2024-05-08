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
          let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/userRecipe/?pageSize=10&pageNumber=1`,
            {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},}
          );
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
        <div className="container mt-md-5">
            <div className="row">
                {favsList.length > 0 ?favsList.map((fav) => 
                <div key={fav.id} className="col-xl-3 col-lg-4 col-md-6">
                    <div className='position-relative w-100 mb-md-5 rounded-3 shadow border border-2 text-start bg-light'>
                        <img className='w-100 rounded' height={300} src={staticUrl + fav.recipe.imagePath} alt='no image'/>
                        <div className="position-absolute top-0 end-0  px-1 m-2  bg-body rounded-2">
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
