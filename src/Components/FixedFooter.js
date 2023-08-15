import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useWindowSize from "../utils/useWindowSize";
import signIn from "../assets/signin.svg";
import search from "../assets/search.svg";
import logo from "../assets/logo.svg";
import cart3 from "../assets/cart3.svg";

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
                <Link to="/" className="flex flex-col items-center">
                  <img src={logo} alt="search" className="w-[22px] h-[22px]" />
                  <span className="mt-1">SWIGGY</span>
                </Link>
              </li>
              <li>
                <Link to="/search" className="flex flex-col items-center">
                  <img
                    src={search}
                    alt="search"
                    className="w-[22px] h-[22px]"
                  />
                  <span className="mt-1">SEARCH</span>
                </Link>
              </li>
              <li>
                {length === 0 ? (
                  <Link to="/cart" className="flex flex-col items-center">
                    <img
                      src={cart3}
                      alt="search"
                      className="w-[22px] h-[22px]"
                    />
                    <span className="mt-1">CART</span>
                  </Link>
                ) : (
                  <Link to="/cart" className="flex flex-col items-center">
                    <img
                      src={cart3}
                      alt="search"
                      className="w-[22px] h-[22px]"
                    />
                    <div className="flex">
                      <span className="mt-1 pl-4">CART</span>
                      <span
                        style={{ backgroundColor: "#36393E", color: "#F4F4F5" }}
                        className="w-4 h-4 flex justify-center items-center text-white rounded-xl relative bottom-6 right-2"
                      >
                        {length}
                      </span>
                    </div>
                  </Link>
                )}
              </li>
              <li className="">
                {userInfo.isLoggedIn ? (
                  <Link
                    to="/users/profile"
                    className="flex flex-col items-center"
                  >
                    <img
                      src={signIn}
                      alt="signIn"
                      className="w-[22px] h-[22px]"
                    />
                    <span className="mt-1">ACCOUNT</span>
                  </Link>
                ) : (
                  <Link to="/login" className="flex flex-col items-center">
                    <img
                      src={signIn}
                      alt="signIn"
                      className="w-[22px] h-[22px]"
                    />
                    <span className="mt-1">ACCOUNT</span>
                  </Link>
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
