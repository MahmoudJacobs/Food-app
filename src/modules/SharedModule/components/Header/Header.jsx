import React from 'react'

export default function Header({title,description,imgUrl}) {
  return (
    <div className='container-fluid p-5 header-container '>
      <div className="row align-items-center">
        <div className="col-md-8">
          <div className="content">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="img text-center">
            <img src={imgUrl} alt="no img" />
          </div>
        </div>
      </div>
    </div>
  )
}
