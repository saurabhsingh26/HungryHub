import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jwt-decode";
import { removeUser, setUser } from "../Redux/features/userSlice";
import swiggy from "../assets/swiggy.png";

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
        className="logo-container hover:scale-110 hover:duration-300"
      >
        <img className="w-[34px]" src={swiggy} alt="logo" />
      </Link>
      <div
        style={{ color: "#3D4152" }}
        className="flex items-center text-base font-medium"
      >
        <ul className="flex">
          <li className="pr-3">
            <Link to="/search">Search</Link>
          </li>
          <li className="pr-3">
            <Link to="/offers">Offers</Link>
          </li>
          {/* <li className="pr-3">
            <Link to="/about">About</Link>
          </li> */}

          {/* <li className="pr-3">
            <Link to="/grocery">Grocery</Link>
          </li> */}
          <li className="pr-3">
            <Link to="/cart">Cart {length}</Link>
          </li>
          <li className="pr-3">
            {userInfo ? (
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
