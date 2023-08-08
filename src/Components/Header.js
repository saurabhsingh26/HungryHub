import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import swiggy from "../assets/swiggy.png";

const Header = () => {
  // Subscribing to the store using Selector
  const cartItems = useSelector((store) => store.cart.items);

  const length = cartItems.reduce((acc, curr) => {
    acc = acc + curr.inStock;
    return acc;
  }, 0);

  return (
    <div className="flex justify-between sticky top-0 z-20 bg-white shadow-lg mb-2 w-auto items-center h-20 p-4 lg:p-8">
      <Link to="/" className="logo-container hover:scale-110 hover:duration-300">
        <img className="w-[34px]" src={swiggy} alt="logo" />
      </Link>
      <div
        style={{ color: "#3D4152" }}
        className="flex items-center text-base font-medium"
      >
        <ul className="flex">
          <li className="pr-3">
            <Link to="/">Home</Link>
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
        </ul>
      </div>
    </div>
  );
};

export default Header;
