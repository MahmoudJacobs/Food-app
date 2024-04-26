import React from 'react'
import headerImg from "../../../../assets/images/header.png"

export default function Header() {
  return (
    <div className='container-fluid m-2 p-5 bg-info '>
      <div className="row">
        <div className="col-md-8">
          <div className="content">
            <h2>Welcome mahmoud1</h2>
            <p>This is a welcoming screen for the entry of the application, you can now see the options</p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="img">
            <img src={headerImg} alt="no img" />
          </div>
        </div>
      </div>
    </div>
  )
}
