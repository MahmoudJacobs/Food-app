import React from 'react'
import logo from '../../../../assets/images/logo.png'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
        <div className="container-fluid notFound-container">
          <div className='nf-content d-flex flex-column align-items-left pt-md-4'>
            <img className='nf-logo' src={logo} alt='no logo'/>
            <div className='nf-text'>
              <h3>Oops.</h3>
              <h3 className='text-success'>Page not found</h3>
              <p>This page doesn't exist or was removed!</p>
              <p>we suggest you back to home.</p>
            </div>
            <br/>
            <Link to="/dashboard" className='nf-btn d-flex align-items-center justify-content-center w-25 text-decoration-none rounded border-0 bg-success'>
                <span className='fa fa-arrow-left' aria-hidden="true"></span>Back to home
            </Link>
          </div>
        </div>
  )
}
