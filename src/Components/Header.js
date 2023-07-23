import React from 'react'
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../utils';
import useOnlineStatus from '../utils/useOnlineStatus';

const Header = () => {
  const onlineStatus = useOnlineStatus();
  return (
    <div className="flex justify-between bg-pink-200 shadow-lg mb-2 w-auto sm:bg-yellow-50 lg:bg-green-50">
      <div className="logo-container">
        <img className="logo w-32" src={LOGO_URL} alt="logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-2">
          <li className="px-4">Online Status : {onlineStatus ? "✅" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">Cart</li>
        </ul>
      </div>
    </div>
  );
}

export default Header