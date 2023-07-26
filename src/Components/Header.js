import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../utils';
import UserContext from '../utils/UserContext';
const Header = () => {
  const User = useContext(UserContext);
  console.log("User", User);
  return (
    <div className="flex justify-between bg-green-50 shadow-lg mb-2 w-auto items-center h-20">
      <div className="logo-container">
        <img className="logo w-32" src={LOGO_URL} alt="logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex p-3">
          <li className="pr-3">
            <Link to="/">Home</Link>
          </li>
          <li className="pr-3">
            <Link to="/about">About</Link>
          </li>
          <li className="pr-3">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="pr-3">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
}

export default Header