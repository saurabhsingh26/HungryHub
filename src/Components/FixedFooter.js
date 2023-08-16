import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useWindowSize from "../utils/useWindowSize";
import { ReactComponent as SignIn } from "../assets/signin.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Cart } from "../assets/cart3.svg";

const FixedFooter = () => {
  const userInfo = useSelector((store) => store.account.user);
  const cartItems = useSelector((store) => store.cart.items);
  const size = useWindowSize();
  const length = cartItems.reduce((acc, curr) => {
    acc = acc + curr.inStock;
    return acc;
  }, 0);

  return (
    <div>
      {size.width <= 767 ? (
        <div>
          <div
            style={{ color: "#93959F" }}
            className="fixed bg-white left-0 right-0 bottom-0 text-[9px] z-20"
          >
            <ul className="flex justify-between items-center py-3 px-4 border tracking-tighter font-semibold">
              <li>
                <NavLink to="/" className="flex flex-col items-center">
                  <Logo className="svg-class w-[22px] h-[22px]" />
                  <span className="mt-1">SWIGGY</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/search" className="flex flex-col items-center">
                  <Search className="svg-class w-[22px] h-[22px]" />
                  <span className="mt-1">SEARCH</span>
                </NavLink>
              </li>
              <li>
                {length === 0 ? (
                  <NavLink to="/cart" className="flex flex-col items-center">
                    <Cart className="svg-class w-[22px] h-[22px]" />
                    <span className="mt-1">CART</span>
                  </NavLink>
                ) : (
                  <NavLink to="/cart" className="flex flex-col items-center">
                    <Cart className="svg-class w-[22px] h-[22px]" />
                    <div className="flex">
                      <span className="mt-1 pl-4">CART</span>
                      <span
                        style={{ backgroundColor: "#36393E", color: "#F4F4F5" }}
                        className="w-4 h-4 flex justify-center items-center text-white rounded-xl relative bottom-6 right-2"
                      >
                        {length}
                      </span>
                    </div>
                  </NavLink>
                )}
              </li>
              <li className="">
                {userInfo.isLoggedIn ? (
                  <NavLink
                    to="/users/profile"
                    className="flex flex-col items-center"
                  >
                    <SignIn className="svg-class w-[22px] h-[22px]" />
                    <span className="mt-1">ACCOUNT</span>
                  </NavLink>
                ) : (
                  <NavLink to="/login" className="flex flex-col items-center">
                    <SignIn className="svg-class w-[22px] h-[22px]" />
                    <span className="mt-1">ACCOUNT</span>
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FixedFooter;
