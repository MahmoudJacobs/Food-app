import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <div>Sidebar
      <button onClick={logout} className='btn btn-danger'>logout</button>
    </div>
  )
}
