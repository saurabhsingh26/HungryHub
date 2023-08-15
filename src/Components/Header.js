import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jwt-decode";
import { toast } from "react-toastify";
import { removeUser, setUser } from "../Redux/features/userSlice";
import swiggy from "../assets/logo.svg";
import offer from '../assets/offers.svg'
import search from '../assets/search.svg'
import signIn from '../assets/signin.svg'
import cart from '../assets/cart.svg'
import cart2 from "../assets/cart2.svg";


const Header = () => {
  // Subscribing to the store using Selector
  const cartItems = useSelector((store) => store.cart.items);
  const userInfo = useSelector((store) => store.account.user.isLoggedIn);
  const dispatch = useDispatch();

  const length = cartItems.reduce((acc, curr) => {
    acc = acc + curr.inStock;
    return acc;
  }, 0);

  const handleLogout = () => {
    localStorage.removeItem("__hungryhub_token__");
    dispatch(removeUser())
    toast.success("Logged out successfully");
  }

  useEffect(() => {
    const token = localStorage.getItem("__hungryhub_token__");
    if (token) {
      const userDetails = jwt(token);
      dispatch(setUser(userDetails));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="flex justify-between sticky top-0 z-20 bg-white shadow-lg mb-2 w-auto items-center h-20 p-4 lg:p-8">
      <Link
        to="/"
        className="logo-container hover:scale-110 hover:duration-300 pl-8"
      >
        <img className="w-[34px]" src={swiggy} alt="logo" />
      </Link>
      <div
        style={{ color: "#3D4152" }}
        className="flex items-center text-base font-medium"
      >
        <ul className="flex">
          <li className="pr-10">
            <Link to="/search" className="flex items-center">
              <img src={search} alt="search" className="w-[17px] h-[17px]" />
              <span className="pl-3">Search</span>
            </Link>
          </li>
          <li className="pr-10">
            <Link to="/offers" className="flex items-center">
              <img src={offer} alt="offer" className="w-[19px] h-[19px]" />
              <span className="pl-3">Offers</span>
            </Link>
          </li>
          {/* <li className="pr-3">
            <Link to="/about">About</Link>
          </li> */}

          {/* <li className="pr-3">
            <Link to="/grocery">Grocery</Link>
          </li> */}

          <li className="pr-10">
            {userInfo ? (
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center">
                <img src={signIn} alt="signIn" className="w-[19px] h-[19px]" />
                <span className="pl-3">Sign In</span>
              </Link>
            )}
          </li>

          <li className="pr-10">
            {length !== 0 ? (
              <Link to="/cart" className="flex items-center">
                <img src={cart2} alt="cart" className="w-[19px] h-[19px]" />
                <span className="pl-3">Cart</span>
                <span className="flex justify-center items-center min-w-[18px]  text-[12px] text-center text-white relative top-[0.5px] right-[61px]">
                  {length}
                </span>
              </Link>
            ) : (
              <Link to="/cart" className="flex items-center">
                <img src={cart} alt="cart" className="w-[19px] h-[19px]" />
                <span className="pl-3">Cart</span>
                <span className="flex justify-center items-center min-w-[18px]  text-sm text-center  relative -top-[1px] right-[61px]">
                  {length}
                </span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
