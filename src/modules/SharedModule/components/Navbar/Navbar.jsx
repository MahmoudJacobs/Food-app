import React from 'react'
import navbarLogo from "../../../../assets/images/avatar.png"


export default function Navbar({loginData}) {
  console.log(loginData)
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link">
                  <img className='avatar' src={navbarLogo}/>
                  Hello : {loginData.userName}
                </a>
              </li>
            </ul>
          </div>
      </div>
    </nav>
</>
}
