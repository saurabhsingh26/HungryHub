import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jwt-decode";
import { setUser } from "../Redux/features/userSlice";
import useWindowSize from "../utils/useWindowSize";
import swiggy from "../assets/logo.svg";
import { ReactComponent as Offer } from "../assets/offers.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as SignIn } from "../assets/signin.svg";
import { ReactComponent as EmptyCart } from "../assets/cart.svg";
import { ReactComponent as NonEmptyCart } from "../assets/cart2.svg";

const Header = () => {
  // Subscribing to the store using Selector
  const cartItems = useSelector((store) => store.cart.items);
  const userInfo = useSelector((store) => store.account.user);
  const dispatch = useDispatch();

  const length = cartItems.reduce((acc, curr) => {
    acc = acc + curr.inStock;
    return acc;
  }, 0);

  const size = useWindowSize();

  useEffect(() => {
    const token = localStorage.getItem("__hungryhub_token__");
    if (token) {
      const userDetails = jwt(token);
      dispatch(setUser(userDetails));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-between sticky top-0 z-20 bg-white shadow-lg mb-2 w-auto items-center h-20 p-4 md:p-8">
      <NavLink
        to="/"
        className="logo-container hover:scale-110 hover:duration-300"
      >
        <img className="w-[30px] md:w-[34px]" src={swiggy} alt="logo" />
      </NavLink>
      <div
        style={{ color: "#3D4152" }}
        className="flex items-center text-base font-medium"
      >
        {size.width >= 768 ? (
          <ul className="flex">
            <li className="pr-10">
              <NavLink to="/search" className="flex items-center">
                <Search className="svg-class" />
                <span className="pl-3">Search</span>
              </NavLink>
            </li>
            <li className="pr-10">
              <NavLink to="/offers" className="flex items-center">
                <Offer className="svg-class" />
                <span className="pl-3">Offers</span>
              </NavLink>
            </li>
            {/* <li className="pr-3">
            <NavLink to="/about">About</NavLink>
          </li> */}

            {/* <li className="pr-3">
            <NavLink to="/grocery">Grocery</NavLink>
          </li> */}

            <li className="pr-10">
              {userInfo.isLoggedIn ? (
                <NavLink to="/users/profile" className="flex items-center">
                  <SignIn className="svg-class" />
                  <span className="pl-3">{userInfo.name}</span>
                </NavLink>
              ) : (
                <NavLink to="/login" className="flex items-center">
                  <SignIn className="svg-class" />
                  <span className="pl-3">Sign In</span>
                </NavLink>
              )}
            </li>

            <li>
              {length !== 0 ? (
                <NavLink to="/cart" className="flex items-center">
                  <NonEmptyCart className="svg-class" />
                  <span className="pl-3">Cart</span>
                  <span className="flex justify-center items-center min-w-[18px]  text-[12px] text-center text-white relative -top-[1px] right-[62px]">
                    {length}
                  </span>
                </NavLink>
              ) : (
                <NavLink to="/cart" className="flex items-center">
                  <EmptyCart className="svg-class" />
                  <span className="pl-3">Cart</span>
                  <span
                    style={{ color: "#686b78" }}
                    className="flex justify-center items-center min-w-[18px]  text-sm text-center  relative -top-[1.5px] right-[62px]"
                  >
                    {length}
                  </span>
                </NavLink>
              )}
            </li>
          </ul>
        ) : (
          <ul className="flex">
            <li className="">
              <NavLink to="/offers" className="flex items-center">
                <Offer className="svg-class" />
                <span className="pl-3">Offers</span>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
