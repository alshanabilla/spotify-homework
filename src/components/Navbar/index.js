import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/auth-slice';
import './index.css';

function Navbar () {
const dispatch = useDispatch();
  return (
    <nav className="navbar">
      <div className="navbar_menu container">
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar;