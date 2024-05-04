import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function FillandShow() {
  const navigate = useNavigate();
  const goToRecipesList = () => {
    navigate("/dashboard/recipes");
  }
  return (
    <div className='p-5 m-4 fillandshow-container rounded'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='col-md-6'>
           <div className="content">
            <h3>Fill the <b className='text-success'>Recipes </b>!</h3>
            <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
           </div>
        </div>
        <div className="col-md-2">
          <Link to="/Dashboard/recipes">
            <button onClick={goToRecipesList} className='btn btn-success rounded p-3 w-100 border-0 text-white'>
                <b>Fill Recipes</b>
                <span><i className='fillicon fa fa-arrow-right'></i></span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
